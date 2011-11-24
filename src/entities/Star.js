define(["lib/compose", "core/entities/particle_gen"], function(compose, Particle_gen){

    var star =  
        compose(function(){
            var dist = Math.random()

            this.height = ~~(Math.random() * 3)
            this.width = this.height

            this.speed = 0.2 - (dist * 0.2) 
            var color = ~~(150 * 1/dist)
            this.color = "rgb(" + color + "," + color + "," + color + ")"
        
        },
        {
        z: 0,
        draw: function(offset, context, canvas){
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, 2, 2)
        },
        update: function(td){
            this.x += td * this.speed
        }
    })
    
    return compose({
        init: function(game){
            var p = new Particle_gen(star, 100)
            
            p.x = -10
            p.y = -10
            
            p.width = 1
            p.height = game.canvas.height

            game.add(p)
        }
    })
})
