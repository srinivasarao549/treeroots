define([], function(){
    
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
                var type = data[i].type
                this.game.add(new this.entities[type])
            }
        
        }

    })()

    return Level
})
