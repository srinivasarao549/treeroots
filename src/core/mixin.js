define(function(){

    function mixin(){        
            var sources = [],
                obj = arguments[arguments.length - 1]
           
            for ( var i = arguments.length - 2; i >= 0; i -= 1)
                sources.push(arguments[i])
            
            sources.forEach(function(source){
                Object.keys(source).forEach(function(key){
                    var val = source[key]
                    if ( !obj[key] ) {
                        if ( val instanceof Array ) obj[key] = mixin(val, [])
                        else if ( typeof val == "object" && val !== null) obj[key] = mixin(val, {})
                        else obj[key] = val
                    }
                })                
            })
            return obj;
        }    
  
    mixin.ctor = function(){
        var obj = mixin.apply({}, arguments)
        
        return function(){
            mixin(obj, this)
        }
    }  

    return mixin
})
  
