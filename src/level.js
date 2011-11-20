define(['core/mixin'], function(mixin){
    
    function Level(game, entities){
        this.game = game
        this.entities = entities
        this.loaded = true
        this.pending_operations = 0
    }   

    Level.prototype = (function(){
        return {
            load: load,
            load_objects: load_objects,
            load_images: load_images
        }

        function load(data){
            
            if ( typeof data == "string" ) data = JSON.parse(data)

            if ( data instanceof Array ) {
                this.load_objects(data)
            } else {
                for ( var prop in data ){
                    if ( this["load_" + prop] instanceof Function)
                        this["load_" + prop](data[prop])
                }
            }

        }

        function load_objects(data){
            this.loaded = false
            this.pending_operations += 1
            var i = data.length
            
            while ( i --> 0 ){
                var spec = data[i],
                    obj = new this.entities[spec.type]
    
                delete spec.type
                mixin(spec, obj)
            
                this.game.add(obj)
            
            }

            this.pending_operations -= 1
            if ( this.pending_operations <= 0 ) this.loaded = true
        }

        function load_images(data){
            var i = data.length
            
            while ( i --> 0 ){
                var src = data[i],
                    image 
                
                // don't try to load one we're loading already
                if ( this.game.images[src] ) continue;
                
                this.pending_operations += 1
                this.loaded = false

                image = new Image
                image.src = src
                image.onload = function(){ 
                    this.pending_operations -= 1;
                    if ( this.pending_operations <= 0 ) this.loaded = true
                }.bind(this)

                this.game.images[src] = image 
            }
        }

    })()

    return Level
})
