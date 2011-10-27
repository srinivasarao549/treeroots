    
    entities.Explosion = function(x, y, particles, speed){
                
        
        // spawn lots of particles!
        for ( var i = 0; i < particles; i += 1 )
            game.add(new Particle())
        
        // no reason to have an empty object hanging about
        game.remove(this)
        
        function Particle(){
            this.x = x || 0
            this.y = y || 0
            this.angle = Math.random() * 2 * Math.PI
            this.distance = 0
            this.alpha = 1
            this.speed = speed || 100
        
            this.draw = function(context){
                var style_cache = context.fillStyle
                xy = entities.camera.apply_camera(this)
                context.fillStyle = "rgba(100, 0, 100, " + this.alpha + ")"
                context.fillRect(xy.x, xy.y, 5, 5)            
                context.fillStyle = style_cache                
            }
        
            this.update = function(td){
                var speed = this.speed / td,
                    angle = this.angle
            
                this.x += Math.cos(angle) * speed
                this.y += Math.sin(angle) * speed
            
                this.distance += speed
                this.alpha -= td/1000
                if ( this.alpha < 0 ) game.remove(this)
            }
        }

    }