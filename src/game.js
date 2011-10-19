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
