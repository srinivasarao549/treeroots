
!function(){

    entities.Explosion = function(x, y, particles, velocity, max_distance){
        
                
        // spawn lots of particles!
        for ( var i = 0; i < particles; i += 1 )
            game.add(new Particle(x, y, velocity, max_distance))
        
        // no reason to have an empty object hanging about
        game.remove(this)
    }

    function Particle(x, y, velocity, max_distance){
        core.mixin(mixins.moveByAngle, mixins.fillRect, this)

        this.set_color(0.75, 0, 1, 1)
        this.max_distance = max_distance || 200
        this.velocity = velocity || 75
        
        this.angle = Math.random() * 2 * Math.PI
        this.x = x
        this.y = y
        this.z = 3
        
        this.update = function(td){
            var distance_moved = this.moveByAngle(td)
            this.color_alpha -= distance_moved/this.max_distance
            
            // for some reason, setting this to <= 0 causes occasional glitches
            // where black boxes show instead of the nearly-invisible ones
            // desired
            if ( this.color_alpha <= 0.01 ) {
                game.remove(this)
            }
        }
    }


}()
