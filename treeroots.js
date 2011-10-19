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
            if ( this.layers[entity.layer] == undefined ) this.layers[entity.layer] = []
            
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
        
        var Player = function(){
            this.x = 0
            this.y = 0
        }
        
        Player.prototype = new Entity()
        
        Player.prototype.draw = function(context){
            context.fillRect(0, 0, 100, 100)
        }
                
                
        game.constructors["Player"] = Player
        
    }()
    //--------------------------------//



    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        game.add_object(new game.constructors.Player())

        flywheel(function(time_delta){
            game.update(time_delta)
            game.draw_all()
        }).start()

    }

}(this)