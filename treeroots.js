!function(window, undefined){
//--------------------------------//


    // main controlling object
    function Game(){
        this.counter = 0
        this.objects = []
    }
    
    Game.prototype = (function(){
        
        return {
            // object tracking methods
            add: add,
            retrieve: retrieve,
            remove: remove,
            remove_all: remove_all,
            
            // processing methods
            update: update,
            draw: draw
        }
        
        
//----------------------------------------------------------//
//              OBJECT TRACKING METHODS
//----------------------------------------------------------//
    
        function add(object){
            var id = this.counter
            
            this.counter += 1
            
            // store
            this.objects.push(object)
            
            // so we can find with the object itself
            Object.defineProperty(object, "_id", {  value: id,
                                                    writable: false,
                                                    enumerable: false
                                                    })
            return id
        }
        
        function retrieve(objref){
            if ( objref instanceof Object ) objref = objref._id
            return this.objects[objref]
        }
        
        
        function remove(objref){
            if ( objref instanceof Object ) objref = objref._id
            delete this.objects[objref]
        }
        
        function remove_all(){
            this.objects = []
        }
        

//----------------------------------------------------------//
//              PROCESSING METHODS
//----------------------------------------------------------//        
        function update(td, input, canvas){
            this.objects.forEach(function(val){
                if ( val.update ) val.update(td, input, canvas)
            })
        }
        
        function draw(canvas, context){
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.objects.forEach(function(val){
                if ( val.draw ) val.draw(context)
            })            
        }
        
    })()
    
    
    var game = new Game()
    
    // collection for entities
    var entities = {}


    entities.camera = new (function(){
        this.x = 0
        this.y = 0
        
        
        this.apply_camera = function(object, distance){
            var x, y, distance = distance || 1
            
            x = (object.x - this.x) * distance
            y = (object.y - this.y) * distance
            
            return {x: x, y: y}
        }
        
        this.reverse_apply_camera = function(object, distance){
            var x, y, distance = distance || 1
            
            x = (object.x + this.x) * distance
            y = (object.y + this.y) * distance
            
            return {x: x, y: y}
        }
        
        game.add(this)
        
    })()

    entities.Cursor = function(){
        this.layer = 0
        this.x = Math.random() * 1000
        this.y = Math.random() * 1000
        this.radius = 10
        this.draw = function(context){
            context.fillRect(this.x, this.y, 10, 10)
            context.fill();
        }

        this.update = function(td, input){
            this.x = input.mouseX
            this.y = input.mouseY
            
            if ( input.click ) {
                var xy = entities.camera.reverse_apply_camera(this)
                game.add(new entities.Explosion(xy.x, xy.y, 100, 100))
                
            }
        }

    }
    
    entities.Explosion = function(x, y, particles, speed){
                
        
        // spawn lots of particles!
        for ( var i = 0; i < particles; i += 1 )
            game.add(new Particle())
        
        // no reason to have an empty object hanging about
        game.remove(this)
        
        function Particle(){
            this.x = x || 0
            this.y = y || 0
            this.angle = Math.random() * 2 * Math.PI
            this.distance = 0
            this.alpha = 1
            this.speed = speed || 100
        
            this.draw = function(context){
                var style_cache = context.fillStyle
                xy = entities.camera.apply_camera(this)
                context.fillStyle = "rgba(100, 0, 100, " + this.alpha + ")"
                context.fillRect(xy.x, xy.y, 5, 5)            
                context.fillStyle = style_cache                
            }
        
            this.update = function(td){
                var speed = this.speed / td,
                    angle = this.angle
            
                this.x += Math.cos(angle) * speed
                this.y += Math.sin(angle) * speed
            
                this.distance += speed
                this.alpha -= td/1000
                if ( this.alpha < 0 ) game.remove(this)
            }
        }

    }

    entities.Ground = function(){
        this.x = 0
        this.y = 0
        
        this.image = new Image()
        this.image.onload = function(){

        }
        
        this.image.src = 'resources/images/ground.jpg'
        
        this.draw = function(context){
            var xy = entities.camera.apply_camera(this)                
            context.drawImage(this.image, xy.x, xy.y)
        }
    
    }

    entities.Player = function(){
        this.layer = 0
        this.x = 0
        this.y = 0
    
        this.draw = function(context){
            var style_cache = context.fillStyle,
                xy = entities.camera.apply_camera(this)
            context.fillStyle = "rgba(100, 0, 100, 0.8)"
            context.fillRect(xy.x, xy.y, 40, 40)            
            context.fillStyle = style_cache                
        }
        
        this.update = function(td, input, canvas){
            var speed = 0.25 * td,
                directionX = 0,
                directionY = 0
                                
            if ( input.right ) directionX += 1
            if ( input.left ) directionX -= 1
            if ( input.down ) directionY += 1
            if ( input.up ) directionY -= 1
            
            // movement
            if ( directionX !== 0 || directionY !== 0 ){
                var angle = Math.atan2(directionY, directionX)
                                    
                this.x += Math.cos(angle) * speed
                this.y += Math.sin(angle) * speed

            }
      
            // move camera
            var camera = entities.camera
            if ( this.x > (canvas.width/2)) camera.x = this.x - canvas.width/2
            if ( this.y > (canvas.height/2)) camera.y = this.y - canvas.height/2
        }
    }
//--------------------------------//


    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        // helper modules
        var flywheel = require("flywheel"),
            bean = require("bean"),
            clash = require("clash")
            
        // initialise game
        var context = canvas.getContext("2d"),
            input = {}

        game.check_collision = clash().check
        
        // handle keyboard input
        bean.add(document, 'keydown', function(e){
            var k = e.which

            if ( k == 65 ) 
                input.left = true
            else if ( k == 68 ) 
                input.right = true
            else if ( k == 87 )
                input.up = true
            else if ( k == 83 )
                input.down = true
        
        }) 
        
        bean.add(document, 'keyup', function(e){
            var k = e.which
                        
            if ( k == 65 ) 
                input.left = false
            else if ( k == 68 ) 
                input.right = false
            else if ( k == 87 )
                input.up = false
            else if ( k == 83 )
                input.down = false
        
        })
        
        // handle mouse input
        !function(){
            bean.add(document, 'mousemove', function(e){
                input.mouseX = e.clientX - canvas.offsetLeft
                input.mouseY = e.clientY - canvas.offsetTop
            })
        
            bean.add(canvas, 'mousedown', function(e){
                input.mousedown = true
                input.click = true
            })
            
            bean.add(canvas, 'mouseup', function(e){
                input.mousedown = false
            })
        }()

        
        // load objects
        !function(){
            var player = new entities.Player(),
                cursor = new entities.Cursor(),
                ground = new entities.Ground()    
                
            game.add(ground)    
            game.add(player)
            game.add(cursor)            
        }()
        
        // loop
        flywheel(function(time_delta){            
            game.update(time_delta, input, canvas)
            game.draw(canvas, context)

            input.click = false 

        }).start()

    }

}(this)