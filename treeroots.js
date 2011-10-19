//  contains main game logic
!function(window, undefined){
//--------------------------------//


    // main controlling object
    var game = (function(){
        
        return {
            // attr
            
            camera: { x: 0, y: 0 }, 
            entities: [],           // all objects in scene
            layers: [],             // rough drawing order
            constructors: {},       // constructor functions for each game object
            input: {},              // input types and bools, letting handlers be defined externally
            canvas: undefined,
            context: undefined,
        
            // methods
            update: update,         
            add_entity: add_entity,
            remove_entity: remove_entity,
            draw_all: draw_all
        }
        
        // updates all objects in the game
        function update(time_delta){
            this.entities.forEach(function(entity, key){
                entity.update(time_delta)
            })
        }
        
        // adds object to the game
        function add_entity(entity){
            
            this.entities.push(entity)
            
            // make a new layer if need be
            if ( typeof this.layers[entity.layer] == "undefined" ) this.layers[entity.layer] = []
            
            // add object to layer
            this.layers[entity.layer].push(entity)
            
            return entity
        }
        
        // removes entity from the game
        function remove_entity(entity){
            var entities = this.entities,
                layers = this.layers
                
            entities.splice(entities.indexOf(entity), 1)
            
            layers.forEach(function(layer){
                layer.splice(layer.indexOf(entity), 1)
            })
        }
    
        // draws everything in the game
        function draw_all(){
            var canvas = this.canvas,
                context = this.context,
                layers = this.layers,
                camera = this.camera
                
                context.clearRect(0, 0, canvas.width, canvas.height)
                layers.forEach(function(layer){
                    layer.forEach(function(entity){                        
                        entity.draw(context, camera)
                    })
                })
        }
        
    })()
//--------------------------------//


    // entity base constructor
    var Entity = function(){}
    
    Entity.prototype = (function(){
        
        return {
            // Default attr
            layer: 0,
            
            
            // Methods
            draw: draw,
            update: update,
            link: link,
        }
        
        // empty functions so it doesn't need to be checked at runtime 
        function draw(){}
        function update(){}
        
        // makes this entity aware of another
        function link(entity, type){
            
            if ( !this.linked_to ) this.linked_to = {}
            if ( !this.linked_to[type]) this.linked_to[type] = []
            
            this.linked_to[type].push(entity)
            
            return this
        }
        
    })()
    


    !function(){
        
        var Cursor = function(){
            this.x = 0
            this.y = 0
            this.radius = 10
            
            this.draw = function(context){
                
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(0, 0, 0, 0.4)"
                
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
                context.closePath();
                context.fill();
                
                context.fillStyle = style_cache
                
            }

            this.update = function(td){
                var input = game.input
                
                this.x = input.mouseX
                this.y = input.mouseY
            }
        }
        
        Cursor.prototype = new Entity()

        game.constructors["Cursor"] = Cursor        
        
    }()
    !function(){
    
        var Magic_missle = function(x, y, target){
            this.x = x
            this.y = y
            this.target = target
            this.radius = 10
            
            this.draw = function(context){
            
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(" + (150 + (Math.sin(this.x) * 100)).toFixed(0) + ", 0, 0, 0.8)"

                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
                context.closePath();
                context.fill();
            
                context.fillStyle = style_cache
            
            }

            this.update = function(td){
                
                var diffX = this.target.x - this.x,
                    diffY = this.target.y - this.y,
                    speed = 0.4 * td              
                
                var angle = Math.atan2(diffY, diffX)
                
                this.x += Math.cos(angle) * speed
                this.y += Math.sin(angle) * speed
  
                  // if goes off stage
                if ( this.x < 0 || this.x > game.canvas.width || this.y < 0 ||  this.y > game.canvas.height ) game.remove_entity(this)
                
                // if gets to target
                if ( game.check_collision.circle_circle(this, this.target)) this.explode()
            }
        
            this.explode = function(){
    
                game.remove_entity(this)
            }
        }
    
        Magic_missle.prototype = new Entity()

        game.constructors["Magic_missle"] = Magic_missle        
    
    }()
    !function(){
    
        var Player = function(){
            this.x = 0
            this.y = 0
        
            this.draw = function(context){
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(100, 0, 100, 0.8)"
                
                context.fillRect(this.x, this.y, 40, 40)
            
                context.fillStyle = style_cache
            }
            
        
            this.update = function(td){
                var input = game.input, 
                    speed = 0.25 * td,
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
                
                if ( input.mousedown_fresh ) {
                    var cursor = this.linked_to.cursor[0]
                    var mm = new game.constructors.Magic_missle(this.x, this.y, {x: cursor.x, y: cursor.y, radius: cursor.radius})
                    game.add_entity(mm)
                }
            }
        }
    
        Player.prototype = new Entity()
            
        game.constructors["Player"] = Player
    
    }()
//--------------------------------//



    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        // helper modules
        var flywheel = require("flywheel"),
            bean = require("bean"),
            bonzo = require("bonzo"),
            clash = require("clash")
            
        // initialise game
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        game.check_collision = clash().check
        
        // handle keyboard input
        bean.add(document, 'keydown', function(e){
            var k = e.which,
                input = game.input
            
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
            var k = e.which,
                input = game.input
            
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
            var input = game.input
                        
            bean.add(canvas, 'mousemove', function(e){
                input.mouseX = e.offsetX
                input.mouseY = e.offsetY          
            })
        
            bean.add(canvas, 'mousedown', function(e){
                input.mousedown = true
                input.mousedown_fresh = true
            })
            
            bean.add(canvas, 'mouseup', function(e){
                input.mousedown = false
            })
        }()


        
        // load objects
        !function(){
            var player = new game.constructors.Player(),
                cursor = new game.constructors.Cursor()
                
            // aquaint the two 
            player.link(cursor, "cursor")
            
            game.add_entity(player)
            game.add_entity(cursor)
        
        }()
        
        // loop
        flywheel(function(time_delta){
            game.update(time_delta)
            game.draw_all()
            
            // clear input 
            game.input.mousedown_fresh = false
        }).start()

    }

}(this)