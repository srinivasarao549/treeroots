

    !function(){
        
        var Cursor = function(){
            this.x = 0
            this.y = 0

            this.draw = function(context){
                
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(0, 0, 0, 0.4)"
                
                context.beginPath();
                context.arc(this.x, this.y, 10, 0, Math.PI*2, true);
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
    
        var Magic_missle = function(x, y, target){
            this.x = x 
            this.y = y
            this.target = target
            
            this.draw = function(context){
            
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(0, 0, 0, 0.4)"
            
                context.beginPath();
                context.arc(this.x, this.y, 10, 0, Math.PI*2, true);
                context.closePath();
                context.fill();
            
                context.fillStyle = style_cache
            
            }

            this.update = function(td){
                
                var diffX = this.x - target.x,
                    diffY = this.y - target.y
                    
                    var angle = Math.atan2(directionY, directionX)
                    this.x += Math.cos(angle) * speed
                    this.y += Math.sin(angle) * speed


                // if goes off stage
                if ( this.x < 0 || this.x > game.canvas.width || this.y < 0 ||  this.y > game.canvas.height ) game.remove_entity(this)
            }
        }
    
        Magic_missle.prototype = new Entity()

        game.constructors["Magic_missle"] = Magic_missle        
    
    }()
    !function(){
    
        var Player = function(){
            this.x = 0
            this.y = 0
        
            this.draw = function(context){
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(100, 0, 100, 0.8)"
                
                context.fillRect(this.x, this.y, 40, 40)
            
                context.fillStyle = style_cache
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
                
                if ( input.mousedown_fresh ) this.create_entity("Magic_missle", this.x, this.y, this.linked.cursor[0])
            }
        }
    
        Player.prototype = new Entity()
            
        game.constructors["Player"] = Player
    
    }()
