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
            add_object: add_object,
            remove_object: remove_object,
            draw_all: draw_all
        }
        
        // updates all objects in the game
        function update(time_delta){
            this.entities.forEach(function(entity, key){
                entity.update(time_delta)
            })
        }
        
        // adds object to the game
        function add_object(entity){
            this.entities.push(entity)
            
            // make a new layer if need be
            if ( typeof this.layers[entity.layer] == "undefined" ) this.layers[entity.layer] = []
            
            // add object to layer
            this.layers[entity.layer].push(entity)
        }
        
        // removes object from the game
        function remove_object(entity){
            var entities = this.entities,
                i = entities.indexOf(entity)
                
            entities.splice(i, 1)
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
            update: update
            
        }
        
        // empty functions so it doesn't need to be checked at runtime 
        function draw(){}
        function update(){}
        
    })()
    


    !function(){
        
        var Cursor = function(){
            this.x = 0
            this.y = 0
            
            this.draw = function(context){
                context.fillRect(this.x, this.y, 40, 40)
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
    
        var Player = function(){
            this.x = 0
            this.y = 0
        
            this.draw = function(context){
                context.fillRect(this.x, this.y, 40, 40)
            }
        
            this.update = function(td){
                var input = game.input, 
                    speed = 0.5 * td,
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
            bonzo = require("bonzo")
            
        // initialise game
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        
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
        
        !function(){
            // handle mouse input
            bean.add(canvas, 'mousemove', function(e){
                var input = game.input

                input.mouseX = e.offsetX
                input.mouseY = e.offsetY          
            })
            
        }()

        // load objects
        game.add_object(new game.constructors.Cursor())
        game.add_object(new game.constructors.Player())
        
        // loop
        flywheel(function(time_delta){
            game.update(time_delta)
            game.draw_all()
        }).start()

    }

}(this)