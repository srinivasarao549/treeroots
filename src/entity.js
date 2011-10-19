//--------------------------------//


    // entity base constructor
    var Entity = function(){}
    
    Entity.prototype = (function(){
        
        return {
            // Default attr
            layer: 0,
            
            
            // Methods
            draw: draw,
            update: update,
            link: link            
        }
        
        // empty functions so it doesn't need to be checked at runtime 
        function draw(){}
        function update(){}
        
        // makes this entity aware of another
        function link(entity, type){
            
            if ( !this.linked_to ) this.linked_to = {}
            if ( !this.linked_to[type]) this.linked_to[type] = []
            
            this.linked_to[type].push(0)
            
            return this
        }
        
        function create_entity(type){
            return new game.constructors[type]().apply(this, arguments.splice[1, arguments.length - 1])
        }
        
    })()
    
