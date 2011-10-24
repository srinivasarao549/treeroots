//--------------------------------//


    // main controlling object
    function Game(){
        
        // private
        var channels = {}
        
        // public        
        return {       
            input: {},
            fire: fire,
            bind: bind,
            unbind: unbind,
            before_fire: before_fire,
            after_fire: after_fire
        }
        
        function before_fire(channel, callback){
            if ( channels[channel] === undefined ) channels[channel] = []
            channels[channel].before = callback
        }
        
        function after_fire(channel, callback){
            if ( channels[channel] === undefined ) channels[channel] = []
            channels[channel].after = callback
        }
        
        function fire(channel, message){
            var c = channels[channel]
            if ( !c ) c = []
            
            if ( c.before ) c.before()
            c.forEach(function(callback){
                if ( callback !== undefined ) callback(message)
            })
            if ( c.after ) c.after()
        }
        
        function bind(channel, callback){    
            if ( channels[channel] === undefined ) channels[channel] = []
            channels[channel].push(callback)
            return channels[channel].length - 1
        }
        
        function unbind(channel, id){
            delete channels[channel][id]
        }
    }
    
    var game = new Game()
