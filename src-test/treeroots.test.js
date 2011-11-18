
var Core = function(){

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
        }    
    
    core.mixins = {}
    //--------------------------------//


    // main controlling object
    core.Game = function(canvas){
        this.objects = []
        this.objects_modified = false
        this.camera = { x: 0,
                        y: 0
                    }
    }
    
    core.Game.prototype = (function(){
        
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
    !function(){
        
        var mixins = core.mixins
    core.mixins.position = {
           x: 0,
           y: 0,
           z: 0
        }
        
    core.mixins.dimensions = {
        width: 100,
        height: 100
    }
        
    core.mixins.color = {
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


    core.mixins.fill_rect = core.mixin(mixins.position, mixins.dimensions, mixins.color, { 
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


    core.mixins.draw_image = core.mixin(mixins.position, mixins.dimensions, {
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
    core.mixins.moveByAngle = core.mixin(mixins.position, {
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

    }()
    
    
    //---- END OF MIXINS ----//    

    return core

}



// -------------------------------------------------------------------------- //



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
        core.mixin(mixins.draw_image, this)
        this.image = new Image()
        this.image.src = "resources/images/ground.jpg"
    }

    entities.Player = function(){
        var img = new Image()
        img.src = "resources/images/seth.png"

        return core.mixin(mixins.draw_image, mixins.moveByAngle, {
            z: 3,
            image: img,
            update: function(td, input){
                var speed = 0.4 * td,
                    directiony = 0,
                    directionx = 0
                
                if ( input.up ) directiony += 1
                if ( input.down ) directiony -= 1
                if ( input.left ) directionx -= 1
                if ( input.right ) directionx += 1
                
                if ( directiony || directionx ) this.velocity = 1
                else this.velocity = 0
                
                if ( !directionx ) this.angle = directiony * Math.PI 

                this.moveByAngle(td)

            
            }
        })
    }
//--------------------------------//


    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
                    
        // initialise game
        var context = canvas.getContext("2d"),
            input = {}
        

        core.mixin({    
            event: require("bean"),
            collision: require("clash").check_collision,
            spin: require("flywheel")
        }, core)
    
        // handle keyboard input
        core.event.add(document, 'keydown', function(e){
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
        
        core.event.add(document, 'keyup', function(e){
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
            core.event.add(document, 'mousemove', function(e){
                input.mouseX = e.clientX - canvas.offsetLeft
                input.mouseY = e.clientY - canvas.offsetTop
            })
        
            core.event.add(canvas, 'mousedown', function(e){
                input.mousedown = true
                input.click = true
            })
            
            core.event.add(canvas, 'mouseup', function(e){
                input.mousedown = false
            })
        }()

        // loop
        core.spin(function(time_delta){            
            game.update(time_delta, input, canvas)
            game.draw(canvas, context)
            
            input.click = false 

        }).start()
        
        // load objects
        !function(){
            var cursor = new entities.Cursor(),
                ground = new entities.Ground(),
                player = new entities.Player()

            game.add(player)
            game.add(cursor)
            game.add(ground)
        }()

    }