
    entities.Explosion = function(x, y, particles, velocity, max_distance){
                
        // spawn lots of particles!
        for ( var i = 0; i < particles; i += 1 )
            game.add(new Particle())
        
        // no reason to have an empty object hanging about
        game.remove(this)
        
        function Particle(){
            entity.mixin(this, traits.moveByAngle, traits.fillRect)

            this.set_color(1, 0, 1, 1)
            this.max_distance = max_distance || 200
            this.velocity = velocity || 75
            
            this.angle = Math.random() * 2 * Math.PI
            this.x = x
            this.y = y
            
            this.update = function(td){
                var distance_moved = this.moveByAngle(td)

                this.color_alpha -= distance_moved/this.max_distance
            }
        }

    }
