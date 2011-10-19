

    !function(){
        
        var Cursor = function(){
            this.x = 0
            this.y = 0
            
            this.draw = function(context){
                
                var style_cache = context.fillStyle
                
                context.fillStyle = "rgba(0, 0, 0, 0.4)"
                
                context.beginPath();
                context.arc(this.x, this.y, 100, 0, Math.PI*2, true);
                context.closePath();
                context.fill();
                
                context.fillStyle = style_cache
                
            }

            this.update = function(td){
                var input = game.input
                
                this.x = input.mouseX
                this.y = input.mouseY
            }
        }
        
        Cursor.prototype = new Entity()

        game.constructors["Cursor"] = Cursor        
        
    }()
    !function(){
    
        var Player = function(){
            this.x = 0
            this.y = 0
        
            this.draw = function(context){
                context.fillRect(this.x, this.y, 40, 40)
            }
        
            this.update = function(td){
                var input = game.input, 
                    speed = 0.25 * td,
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
    
        Player.prototype = new Entity()
            
        game.constructors["Player"] = Player
    
    }()
