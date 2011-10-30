
    entities.Player = function(){
        
        entity.mixin(this, traits.drawSpritesheet, traits.moveByAngle)
        
        this.z = 2
        
        this.velocity = 0.20
        
        this.load_image("resources/images/seth.png", function(){
            this.sprite_height = 32
            this.sprite_width = 24
            this.scale = 2
            
        }.bind(this))
        
        this.anim_timer = 250
        
        this.update = function(td, input, canvas){
            var directionX = 0,
                directionY = 0
        
        
                                
            if ( input.up ){
                this.sprite_row = 0
                directionY -= 1
            }
        
            if ( input.right ) {
                this.sprite_row = 1
                directionX += 1
            }
        
            
            if ( input.down ){
                this.sprite_row = 2
                directionY += 1
            }
        
        
            if ( input.left ) {
                this.sprite_row = 3
                directionX -= 1
            }
        
        
            // movement
            if ( directionX !== 0 || directionY !== 0 ){        
                this.anim_timer -= td
                if ( this.anim_timer < 0 ){
                    this.anim_timer = 250
                    this.sprite_col += 1

                    if ( this.sprite_col > 2)
                        this.sprite_col = 0
                }
                
                        
                this.angle = Math.atan2(directionY, directionX)
                this.moveByAngle(td)
            }
      
            // move camera
            if ( this.x > (canvas.width/2) - 42) game.camera.x = ~~ ( this.x - canvas.width/2 + 42 )
            if ( this.y > (canvas.height/2) - 63) game.camera.y = ~~ ( this.y - canvas.height/2 + 64 )
            
        }
        
    }
