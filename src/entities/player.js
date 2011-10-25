

    entities.Player = function(){
        this.layer = 0
        this.x = 0
        this.y = 0
    
        this.draw = function(context){
            var style_cache = context.fillStyle
            context.fillStyle = "rgba(100, 0, 100, 0.8)"
            context.fillRect(this.x, this.y, 40, 40)            
            context.fillStyle = style_cache                
        }
        
        this.update = function(td, input){
            var speed = 0.25 * td,
                directionX = 0,
                directionY = 0
                
            if ( input.right ) directionX += 1
            if ( input.left ) directionX -= 1
            if ( input.down ) directionY += 1
            if ( input.up ) directionY -= 1
            
            // movement
            if ( directionX !== 0 || directionY !== 0 ){
                var angle = Math.atan2(directionY, directionX)
                this.x += Math.cos(angle) * speed
                this.y += Math.sin(angle) * speed
            }
      
        }
    }
