    
    // collection for entities
    //var entities = {}
    
    var entity = {
        
        mixin: function(obj){        
            var sources = []
            for ( var i = 1; i < arguments.length; i += 1)
                sources.push(arguments[i])

            sources.forEach(function(source){
                Object.keys(source).forEach(function(key){
                    obj[key] = source[key]
                })                
            })
            return obj;
        },
    }
    
    var entities = {}
    var traits = {}