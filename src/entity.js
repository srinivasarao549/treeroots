
    // entity constructor
    var Entity = function(){
        this.x = 0
        this.y = 0
    }
    
    Entity.prototype = (function(){
        
        return {
            draw: draw,
            update: update
            
        }
        
        // empty functions so it doesn't need to be checked at runtime 
        function draw(){}
        function update(){}
        
    })()
    
    
    
    