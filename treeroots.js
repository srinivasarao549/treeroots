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
        
            // methods
            update: update,         
            add_object: add_object,
            remote_object: remove_object,
            canvas: undefined,
            context: undefined
        }
        
        // updates all objects in the game
        function update(time_delta){
            this.entities.forEach(function(key, entity){
                entity.update(time_delta)
            })
        }
        
        // adds object to the game
        function add_object(entity){
            this.entities.push(entity)
            
            // make a new layer if need be
            if ( this.layers[entity.layer] == undefined ) this.layers[entity.layer] = []
            
            // add object to layer
            this.layers[entity.layer] = entity
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
                layers = this.layers
                
                layers.forEach(function(a,layer){
                    layer.forEach(function(a, entity){
                        entity.draw()
                    })
                })
        }
        
    })()//--------------------------------//


    // entity constructor
    var Entity = function(){
        this.x = 0
        this.y = 0
    }
    
    Entity.prototype = (function(){
        
        return {
            draw: draw,
            update: update
            
        }
        
        // empty functions so it doesn't need to be checked at runtime 
        function draw(){}
        function update(){}
        
    })()
    
    
    
    
    !function(){
        
        var player = new Entity()
        
        console.log(player)
        
        game.constructors["player"] = player
        
    }()
    //--------------------------------//



    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        flywheel(function(time_delta){
            game.update(time_delta)
        }).start()

    }

}(this)