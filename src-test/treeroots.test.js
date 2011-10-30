//--------------------------------//


    // main controlling object
    function Game(canvas){
        this.objects = []
        this.objects_modified = false
        this.camera = { x: 0,
                        y: 0
                    }
        this.fps_cooldown = 500
    }
    
    Game.prototype = (function(){
        
        return {
            // object tracking methods
            add: add,
            remove: remove,
            remove_all: remove_all,
            find_instances: find_instances,
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
            // store
            this.objects.push(object)
            this.objects_modified = true
            return object
        }        
                
        function remove(object){
            var index = this.objects.indexOf(object)
            if ( index >= 0 ){
                this.objects.splice(index, 1)      
                this.objects_modified = true                      
            }
        }
        
        function remove_all(){
            this.objects = []
        }
        
        function find_instances(ctor, obj_set){
            var objs = obj_set || this.objects,
                return_objs = []
            
            objs.forEach(function(o){
                if ( o.constructor == ctor ) 
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
            
            this.fps_cooldown -= td
            if ( this.fps_cooldown <= 0 ){
            
                document.getElementById("fps").innerHTML = 1000 / td
                this.fps_cooldown = 500
            }
        }
        
        function draw(canvas, context){
            var camera = this.camera
            
            if ( this.objects_modified ) {
                this.objects.sort(function(a, b){
                return a.z - b.z
                })
                this.objects_modified = false
            }
            
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.objects.forEach(function(obj){
                if ( obj.draw ) obj.draw(context, camera)
            })
            
        }
        
    })()
    
    
    var game = new Game()
    
    // collection for entities
    //var entities = {}
    
    var entity = {
        
        mixin: function(){        
            var sources = [],
                obj = arguments[arguments.length - 1]
                
            for ( var i = arguments.length - 2; i >= 0; i -= 1)
                sources.push(arguments[i])
            
            sources.forEach(function(source){
                Object.keys(source).forEach(function(key){
                    if ( !obj[key] ) obj[key] = source[key]
                })                
            })
            return obj;
        },
    }
    
    var entities = {}
    var mixins = {}    
!function(){
    
    // all drawn things must have an x, y and z property
    mixins.position = {
           x: 0,
           y: 0,
           z: 0
        }
        
    mixins.color = {
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

    mixins.fillRect = entity.mixin({
        height: 10,
        width: 10,
        draw: function(context, cam){
            var style_cache = context.fillStyle

            context.fillStyle = this.get_color()
            context.fillRect( ~~ (this.x - cam.x), ~~ (this.y - cam.y), 
                                                this.width, this.height)            
            context.fillStyle = style_cache                
                        
        }
    }, mixins.position, mixins.color)
    
    
    mixins.drawImage = entity.mixin(mixins.position, {
        image: undefined,
        scale: 1,
        draw: function(context, cam){
            context.drawImage(this.image, 
                            ~~ (this.x - cam.x), 
                            ~~ (this.y - cam.y),
                            this.image.width * this.scale,
                            this.image.height * this.scale)
        },
        load_image: function(src, callback){
            this.image = new Image()
            this.image.onload = function(){
                if ( callback instanceof Function ) callback()
            }.bind(this)
            this.image.src = src
        }
    })
    
    mixins.drawSpritesheet = entity.mixin(mixins.drawImage,
        
        {
        sprite_height: undefined,
        sprite_width: undefined,
        sprite_row: 0,
        sprite_col: 0,
        draw: function(context, cam){
            context.drawImage(this.image, 
                            this.sprite_width * this.sprite_col,
                            this.sprite_height * this.sprite_row,
                            this.sprite_width,
                            this.sprite_height,
                            ~~ (this.x - cam.x), 
                            ~~ (this.y - cam.y),
                            this.sprite_width * this.scale,
                            this.sprite_height * this.scale
                            )
        }
    })
    
}()


!function(){

    mixins.moveByAngle = entity.mixin({
        velocity: 0.25,
        angle: 0,
        
        moveByAngle: function(td){
            var velocity = this.velocity * td,
                angle = this.angle
        
            this.x += Math.cos(angle) * velocity
            this.y += Math.sin(angle) * velocity
        
            return velocity
        }
    }, mixins.position)

}()

    entities.Cursor = function(){

        // inherit ^^
        entity.mixin(mixins.drawImage, this)

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
                new entities.Explosion(this.x + game.camera.x, this.y + game.camera.y, 100, 0.1, 150)
            } 
        }
    }


!function(){

    entities.Explosion = function(x, y, particles, velocity, max_distance){
        
                
        // spawn lots of particles!
        for ( var i = 0; i < particles; i += 1 )
            game.add(new Particle(x, y, velocity, max_distance))
        
        // no reason to have an empty object hanging about
        game.remove(this)
    }

    function Particle(x, y, velocity, max_distance){
        entity.mixin(mixins.moveByAngle, mixins.fillRect, this)

        this.set_color(0.75, 0, 1, 1)
        this.max_distance = max_distance || 200
        this.velocity = velocity || 75
        
        this.angle = Math.random() * 2 * Math.PI
        this.x = x
        this.y = y
        this.z = 3
        
        this.update = function(td){
            var distance_moved = this.moveByAngle(td)
            this.color_alpha -= distance_moved/this.max_distance
            
            // for some reason, setting this to <= 0 causes occasional glitches
            // where black boxes show instead of the nearly-invisible ones
            // desired
            if ( this.color_alpha <= 0.01 ) {
                game.remove(this)
            }
        }
    }


}()

    entities.Ground = function(){
        entity.mixin(mixins.drawImage, this)
    
        this.load_image("resources/images/ground.jpg")
    }

    entities.Player = function(){
        
        entity.mixin(mixins.drawSpritesheet, mixins.moveByAngle, this)
        
        this.z = 2
        
        this.velocity = 0.20
        
        this.load_image("resources/images/seth.png", function(){
            this.sprite_height = 32
            this.sprite_width = 24
            this.scale = 2
            
        }.bind(this))
        
        this.anim_timer = 250
        
        this.update = function(td, input, canvas){
            var directionX = 0,
                directionY = 0
        
        
                                
            if ( input.up ){
                this.sprite_row = 0
                directionY -= 1
            }
        
            if ( input.right ) {
                this.sprite_row = 1
                directionX += 1
            }
        
            
            if ( input.down ){
                this.sprite_row = 2
                directionY += 1
            }
        
        
            if ( input.left ) {
                this.sprite_row = 3
                directionX -= 1
            }
        
        
            // movement
            if ( directionX !== 0 || directionY !== 0 ){        
                this.anim_timer -= td
                if ( this.anim_timer < 0 ){
                    this.anim_timer = 250
                    this.sprite_col += 1

                    if ( this.sprite_col > 2)
                        this.sprite_col = 0
                }
                
                        
                this.angle = Math.atan2(directionY, directionX)
                this.moveByAngle(td)
            }
      
            // move camera
            if ( this.x > (canvas.width/2) - 42) game.camera.x = ~~ ( this.x - canvas.width/2 + 42 )
            if ( this.y > (canvas.height/2) - 63) game.camera.y = ~~ ( this.y - canvas.height/2 + 64 )
            
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
            var cursor = new entities.Cursor(),
                ground = new entities.Ground(),
                player = new entities.Player()
                            
            game.add(ground)
            game.add(player)
            game.add(cursor)
        }()
        
        // loop
        flywheel(function(time_delta){            
            game.update(time_delta, input, canvas)
            game.draw(canvas, context)

            input.click = false 

        }).set_framerate_cap(20).start()

    }