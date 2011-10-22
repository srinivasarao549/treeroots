
    !function(){
    
        var Magic_missle = function(x, y, target){
            this.x = x
            this.y = y
            this.target = target
            this.radius = 10
            
            this.draw = function(context){
            
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(" + (150 + (Math.sin(this.x) * 100)).toFixed(0) + ", 0, 0, 0.8)"

                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
                context.closePath();
                context.fill();
            
                context.fillStyle = style_cache
            
            }

            this.update = function(td){
                
                this.move(td)
                
                  // if goes off stage
                if ( this.x < 0 || this.x > game.canvas.width || this.y < 0 ||  this.y > game.canvas.height ) game.remove_entity(this)
                
                // if gets to target
                if ( game.check_collision.point_circle(this, this.target)) this.explode()
            }
            
            this.move = function(td){
                var diffX = this.target.x - this.x,
                    diffY = this.target.y - this.y,
                    speed = 0.4 * td              
                
                var angle = Math.atan2(diffY, diffX)
                
                this.x += Math.cos(angle) * speed
                this.y += Math.sin(angle) * speed
            }
        
            this.explode = function(){
                game.remove_entity(this)
            }
        }
    
        Magic_missle.prototype = new Entity()

        game.constructors["Magic_missle"] = Magic_missle        
    
    }()