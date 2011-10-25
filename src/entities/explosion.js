    
    entities.Explosion = function(x, y){
        
        this.x = x || 0
        this.y = y || 0
        this.angle = Math.random() * 2 * Math.PI
        this.distance = 0
        this.alpha = 1
        
        this.draw = function(context){
            var style_cache = context.fillStyle
            context.fillStyle = "rgba(100, 0, 100, " + this.alpha + ")"
            context.fillRect(this.x, this.y, 5, 5)            
            context.fillStyle = style_cache                
        }
        
        this.update = function(td){
            var speed = 5,
                angle = this.angle
            
            this.x += Math.cos(angle) * speed
            this.y += Math.sin(angle) * speed
            
            this.distance += speed
            this.alpha -= td/1000
            
            if ( this.distance > 200 ) game.remove(this)
        }
        
        
    }