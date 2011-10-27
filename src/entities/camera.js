


    entities.camera = new (function(){
        this.x = 0
        this.y = 0
        
        
        this.apply_camera = function(object, distance){
            var x, y, distance = distance || 1
            
            x = (object.x - this.x) * distance
            y = (object.y - this.y) * distance
            
            return {x: x, y: y}
        }
        
        this.reverse_apply_camera = function(object, distance){
            var x, y, distance = distance || 1
            
            x = (object.x + this.x) * distance
            y = (object.y + this.y) * distance
            
            return {x: x, y: y}
        }
        
        game.add(this)
        
    })()