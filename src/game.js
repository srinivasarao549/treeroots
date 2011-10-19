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
        
    })()