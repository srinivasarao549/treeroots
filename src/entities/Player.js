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
                    speed = 0.23 * td,
                    move = function(x, y, speed){

                        if ( !x && !y ) {
                            this.sprite.pause()
                            return
                        }

                        // if moving
                        this.sprite.unpause()

                        if ( x && y ) {
                            this.x += x * speed * 0.7
                            this.y += y * speed * 0.7
                     
                            // we can do this cheeky stuff because of the order of the spritesheet
                            this.sprite.row(y + 1)
                        } else if ( x ){
                            this.x += x * speed
                            this.sprite.row( (-1 * x) + 2)
                        } else if ( y ){
                            this.y += y * speed
                            this.sprite.row(y + 1)
                        }

                    }.bind(this),
                    y_move = 0,
                    x_move = 0

                if ( input.up ) y_move -= 1
                if ( input.down ) y_move += 1

                if ( input.left ) x_move -= 1
                if ( input.right ) x_move += 1
            
                move(x_move, y_move, speed)
                
            }
    })
})
