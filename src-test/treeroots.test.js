
    var core = {}        
    core.mixin =  function(){        
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
        }    //--------------------------------//


    // main controlling object
    function Game(canvas){
        this.objects = []
        this.objects_modified = false
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
//              DEFAULT PROCESSING METHODS
//----------------------------------------------------------//        
        function update(td, input, canvas){
            this.objects.forEach(function(val){
                if ( val.update ) val.update(td, input, canvas)
            })
            
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
    
    
    var entities = {}
    var mixins = {}
    mixins.position = {
           x: 0,
           y: 0,
           z: 0
        }
        
    mixins.dimensions = {
        width: 100,
        height: 100
    }
        
    mixins.color = {
            color_r: 0,
            color_g: 0,
            color_b: 0,
            color_a: 1,
            color_string: function(){
                return "rgba("+ this.color_r + "," +
                                this.color_g + "," +
                                this.color_b + "," +
                                this.color_a + ")"
                }
        }


    mixins.fill_rect = core.mixin(mixins.position, mixins.dimensions, mixins.color, { 
        draw_fill_rect: function(context, x, y, width, height, color){
            var style_cache = context.fillsStyle

            context.fillStyle = color
            context.fillRect(~~x, ~~y, width, height )
            context.fillStyle = style_cache
        },
        draw: function(context, offset){
            var offset = offset || {x: 0, y: 0}
            this.draw_fill_rect(context, this.x + offset.x, this.y + offset.y, this.width, this.height, this.color_string())
        }
    })


    mixins.draw_image = core.mixin(mixins.position, mixins.dimensions, {
        image: undefined,
        draw: function(context, offset){
            var offset = offset || {x: 0, y: 0}
            
            this.draw_image(context, 
                            this.image,
                            this.x + offset.x,
                            this.y + offset.y,
                            this.image.width,
                            this.image.height)
        },
        draw_image: function(context, image, x, y, width, height, clip_x, clip_y, clip_width, clip_height){

            if ( arguments.length !== 10) 
                context.drawImage(image,
                                  x,
                                  y, 
                                  width, 
                                  height)
            else 
                context.drawImage(image,
                                 clip_x, 
                                 clip_y, 
                                 clip_width, 
                                 clip_height, 
                                 x, 
                                 y, 
                                 width, 
                                 height)
        }
    })

/*
    
    mixins.drawImage = core.mixin(mixins.position, {
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
    
    mixins.drawSpritesheet = core.mixin(mixins.drawImage,
        
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

*/
    mixins.moveByAngle = core.mixin(mixins.position, {
        velocity: 0.25,
        angle: 0,
        
        moveByAngle: function(td){
            var velocity = this.velocity * td,
                angle = this.angle
        
            this.x += Math.cos(angle) * velocity
            this.y += Math.sin(angle) * velocity
        
            return velocity
        }
    })


    entities.Cursor = function(){
        
        core.mixin(mixins.fill_rect, {
            z: 4,
            color_a: 0.4,
            update: function(td, input){
                this.x = input.mouseX
                this.y = input.mouseY
            }
        }, this)
        
    }


    entities.Ground = function(){
        core.mixin(mixins.drawImage, this)
        this.load_image("resources/images/ground.jpg")
    }

    entities.Player = function(){
        
        core.mixin(mixins.drawSpritesheet, mixins.moveByAngle, this)
        
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
            var cursor = new entities.Cursor()
                                        
            game.add(cursor)
        }()
        
        // loop
        flywheel(function(time_delta){            
            game.update(time_delta, input, canvas)
            game.draw(canvas, context)

            input.click = false 

        }).set_framerate_cap(20).start()

    }