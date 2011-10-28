//--------------------------------//


    // main controlling object
    function Game(){
        this.empty_spaces = []
        this.objects = []
        this.draw_buffer = []
        this.camera = { x: 0,
                        y: 0
                    }
    }
    
    Game.prototype = (function(){
        
        return {
            // object tracking methods
            add: add,
            remove: remove,
            remove_all: remove_all,
            
            retrieve: retrieve,
            find: find,
            find_nearest: find_nearest,
            find_by_id: find_by_id,
            
            // processing methods
            update: update,
            draw: draw
        }
        
        
//----------------------------------------------------------//
//              OBJECT TRACKING METHODS
//----------------------------------------------------------//
    
        function add(object){
            var id
            
            if ( this.empty_spaces.length > 0 ){
                id = this.empty_spaces.splice(0, 1)
            } else {
                id = this.objects.length
            }
            
            // store
            this.objects[id] = object
            
            
            // so we can find with the object itself
            Object.defineProperty(object, "_id", {  value: id,
                                                    writable: false,
                                                    enumerable: false
                                                    })
            
            this.draw_buffer = []
            this.objects.forEach(function(val){
                this.draw_buffer.push(val)
            }.bind(this))
            
            this.draw_buffer.sort(function(a, b){
                return a.z - b.z
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
            this.empty_spaces.push(objref)
            
            this.draw_buffer = []
            this.objects.forEach(function(val){
                this.draw_buffer.push(val)
            }.bind(this))
            
        }
        
        function remove_all(){
            this.objects = []
        }
        

        function find(type, obj_set){
            var objs = obj_set || this.objects,
                return_objs = []
            
            objs.forEach(function(o){
                if ( o.constructor.name == type ) 
                    return_objs.push(o)
            })
            return return_objs
        }
        
        function find_nearest(reference_object, obj_set){
            var objs = obj_set || this.objects,
                nearest_obj, nearest_distance
            
            objs.forEach(function(o){
                var diffx = Math.abs(reference_object.x - o.x),
                    diffy = Math.abs(reference_object.y - o.y),
                    distance = diffy*diffy + diffx*diffx
                    
                if ( nearest_distance === undefined ){    
                    nearest_distance = distance
                    nearest_obj = o
                } else if ( nearest_distance > distance ){
                    nearest_distance = distance
                    nearest_obj = o
                }
            })

            return nearest_obj
        }

        function find_by_id(id, obj_set){
            var objs = obj_set || this.objects,
                obj = null
                
            objs.forEach(function(o){
                if ( o.id == id ) obj = o
            })
            
            return obj
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
            var camera = this.camera
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.draw_buffer.forEach(function(obj){
                if ( obj.draw ) obj.draw(context, camera)
            })            
        }
        
    })()
    
    
    var game = new Game()
    
    // collection for entities
    //var entities = {}
    
    var entity = {
        
        mixin: function(obj){        
            var sources = []
            for ( var i = 1; i < arguments.length; i += 1)
                sources.push(arguments[i])

            sources.forEach(function(source){
                Object.keys(source).forEach(function(key){
                    obj[key] = source[key]
                })                
            })
            return obj;
        },
    }
    
    var entities = {}
    var traits = {}
!function(){
    
    // all drawn things must have an x, y and z property
    traits.position = {
           x: 0,
           y: 0,
           z: 0
        }
        
    traits.color = {
            color_r: 0,
            color_g: 0,
            color_b: 0,
            alpha: 0,
            set_color: function(r, b, g, a){
                this.color_r = Math.floor(r * 255)
                this.color_g = Math.floor(g * 255)
                this.color_b = Math.floor(b * 255)
                this.color_alpha = a
            },
            get_color: function(){
                return "rgba("+ this.color_r + "," +
                                this.color_b + "," +
                                this.color_g + "," +
                                this.color_alpha + ")"
            }
        }

    traits.fillRect = entity.mixin({
        height: 10,
        width: 10,
        draw: function(context, camera){
            var style_cache = context.fillStyle

            context.fillStyle = this.get_color()
            context.fillRect(this.x, this.y, this.width, this.height)            
            context.fillStyle = style_cache                
                        
        }
    }, traits.position, traits.color)
    
    
    traits.drawImage = entity.mixin({
        image: undefined,
        draw: function(context, cam){
            context.drawImage(this.image, 
                            cam.x - this.x, 
                            cam.y - this.y)
        },
        load_image: function(src, callback){
            this.image = new Image()
            this.image.onload = function(){
                if ( callback instanceof Function ) callback()
            }.bind(this)
            this.image.src = src
        }
    }, traits.position)
    
    traits.drawImageStatic = entity.mixin({}, traits.drawImage)
    
    
}()


!function(){

    traits.moveByAngle = entity.mixin({
        velocity: 100,
        angle: 0,
        
        moveByAngle: function(td){
            var velocity = this.velocity / td,
                angle = this.angle
        
            this.x += Math.cos(angle) * velocity
            this.y += Math.sin(angle) * velocity
        
            return velocity
        }
    }, traits.position)

}()

    entities.Cursor = function(){

        // inherit ^^
        entity.mixin(this, traits.drawImage)

        this.load_image("resources/images/cursor.png")
        
        this.z = 4
        this.draw = function(context){
            var mid_x = this.image.width/2,
                mid_y = this.image.height/2
                
            context.drawImage(this.image, this.x - mid_x, this.y - mid_y)
        }
        
        this.update = function(td, input){
            this.x = input.mouseX
            this.y = input.mouseY
        
            if ( input.click ){
                console.log(game.objects.length)
                var explosion = new entities.Explosion(this.x, this.y, 100, 40, 100)
                game.add(explosion)
            } 
        }
    }


    entities.Explosion = function(x, y, particles, velocity, max_distance){
                
        // spawn lots of particles!
        for ( var i = 0; i < particles; i += 1 )
            game.add(new Particle())
        
        // no reason to have an empty object hanging about
        game.remove(this)
        
        function Particle(){
            entity.mixin(this, traits.moveByAngle, traits.fillRect)

            this.set_color(1, 0, 1, 1)
            this.max_distance = max_distance || 200
            this.velocity = velocity || 75
            
            this.angle = Math.random() * 2 * Math.PI
            this.x = x
            this.y = y
            
            this.update = function(td){
                var distance_moved = this.moveByAngle(td)

                this.color_alpha -= distance_moved/this.max_distance
                if ( this.color_alpha < 0 ) game.remove(this)
            }
        }

    }

    entities.Ground = function(){
        entity.mixin(this, traits.drawImage)
    
        this.load_image("resources/images/ground.jpg")
    }
/*

    entities.Player = function(){
        this.layer = 0
        this.x = 0
        this.y = 0
    
        this.draw = function(context, camera){
            var style_cache = context.fillStyle,
                xy = camera.apply_camera(this)
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
            var camera = game.find("Camera")[0]
            if ( this.x > (canvas.width/2)) camera.x = this.x - canvas.width/2
            if ( this.y > (canvas.height/2)) camera.y = this.y - canvas.height/2
            
        }
    }
    
*///--------------------------------//


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
            var cursor = new entities.Cursor(),
                ground = new entities.Ground()
                            
            game.add(ground)
            game.add(cursor)
        }()
        
        // loop
        flywheel(function(time_delta){            
            game.update(time_delta, input, canvas)
            game.draw(canvas, context)

            input.click = false 

        }).start()

    }