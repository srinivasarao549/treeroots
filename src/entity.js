//--------------------------------//


    // entity base constructor
    var Entity = function(){}
    
    Entity.prototype = (function(){
        
        return {
            // Default attr
            layer: 0,
            
            
            // Methods
            draw: draw,
            update: update
            
        }
        
        // empty functions so it doesn't need to be checked at runtime 
        function draw(){}
        function update(){}
        
    })()
    
