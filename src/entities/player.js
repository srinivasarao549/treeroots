
    entities.Player = function(){
        
        entity.mixin(this, traits.fillRect, traits.moveByAngle)
        
        this.z = 2
        
        
        this.update = function(td, input, canvas){
            var directionX = 0,
                directionY = 0
                                
            if ( input.right ) directionX += 1
            if ( input.left ) directionX -= 1
            if ( input.down ) directionY += 1
            if ( input.up ) directionY -= 1

            // movement
            if ( directionX !== 0 || directionY !== 0 ){                
                this.angle = Math.atan2(directionY, directionX)
                this.moveByAngle(td)
            }
      
            // move camera
            if ( this.x > (canvas.width/2)) game.camera.x = ~~ ( this.x - canvas.width/2 )
            if ( this.y > (canvas.height/2)) game.camera.y = ~~ ( this.y - canvas.height/2 )
            
        }
        
    }
