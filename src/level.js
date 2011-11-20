define(['core/mixin'], function(mixin){
    
    function Level(game, entities){
        this.game = game
        this.entities = entities
    }   

    Level.prototype = (function(){
        return {
            load: load
        }

        function load(json){
            var data = JSON.parse(json),
                i = data.length

            while ( i --> 0 ){
                var spec = data[i],
                    obj = new this.entities[spec.type]
    
                delete spec.type
                mixin(spec, obj)
            
                this.game.add(obj)
            
            }
            
        }

    })()

    return Level
})
