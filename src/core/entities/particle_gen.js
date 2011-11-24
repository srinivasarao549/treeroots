define(["lib/compose", "core/timer"], function(compose, Timer){
    
    return compose(function(Particle, timeout){
        // particle constructor
        this.Particle = Particle
        this.timer.set(timeout)
    },
    {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        timer: new Timer(),
        init: function(game){
            this.game = game
        },
        update: function(td){
            
            this.timer.check(td, function(finished){
                if ( finished ){
                    var particle = new this.Particle
                    
                    particle.x = (Math.random() * (this.width - this.x)) + this.x
                    particle.y = (Math.random() * (this.height - this.y)) + this.y

                    this.game.add(particle)
                }
            }.bind(this))
               
        },
    })

})
