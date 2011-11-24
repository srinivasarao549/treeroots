define(['lib/compose'], function(compose){
    
    return compose(function(game, entities){
        this.game = game
        this.entities = entities
        this.loaded = true
        this.pending_operations = 0
        this.objects = []
    },
    (function(){
        return {
            load: load,
            load_objects: load_objects,
            load_images: load_images,
            
            _inc_counter: _inc_counter,
            _dec_counter: _dec_counter
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
            this._inc_counter()
            var i = data.length
            
            while ( i --> 0 ){
                var spec = data[i],
                    obj = new this.entities[spec.type]
    
                delete spec.type
                compose.call(obj, spec)

                this.objects.push(obj)
            }

            this._dec_counter()
        }

        function load_images(data){
            var i = data.length
            
            while ( i --> 0 ){
                var src = data[i],
                    src_split = src.split('/'),
                    key = src_split[src_split.length - 1].replace("/", ""),
                    image 
                
                // don't try to load one we're loading already
                if ( this.game.images[key] ) continue;
                
                this._inc_counter()

                image = new Image
                image.src = src
                image.onload = this._dec_counter.bind(this)

                this.game.images[key] = image 
            }
        }
        
        
        function _inc_counter(){
            this.loaded = false
            this.pending_operations += 1
        }

        function _dec_counter(){
            this.pending_operations -= 1
            if ( this.pending_operations == 0 ){
                this.objects.forEach(function(obj){
                    this.game.add(obj)
                }.bind(this))
                this.loaded = true
            }
        }

    })()
   )

})
