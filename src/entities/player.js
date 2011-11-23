define(["lib/compose", "core/graphics"], function(compose, g){
    
    return compose({
            x: 0,
            y: 0,
            z: 0,

            init: function(game){
                this.game = game
                this.input = game.input
                this.sprite = new g.Spritesheet(game.images["seth.png"], 3, 4)
                                   .animate([0, 1, 2], 200) 
                                   .bind(this)
                
                game.add(this.sprite)
            },
            update: function(td){
                var input = this.input,
                    speed = 0.2 * td

                if ( input.up ) this.y -= speed
                if ( input.down ) this.y += speed

                if ( input.left ) this.x -= speed
                if ( input.right ) this.x += speed
           }
    })
})
