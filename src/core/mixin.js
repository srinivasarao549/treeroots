        
    core.mixin =  function(){        
            var sources = [],
                obj = arguments[arguments.length - 1]
                
            for ( var i = arguments.length - 2; i >= 0; i -= 1)
                sources.push(arguments[i])
            
            sources.forEach(function(source){
                Object.keys(source).forEach(function(key){
                    if ( !obj[key] ) obj[key] = source[key]
                })                
            })
            return obj;
        }    
    
    core.mixins = {}