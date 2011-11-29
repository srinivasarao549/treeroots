define(["lib/compose", "core/graphics/*"], function(compose, g){
    
    return compose({
            x: 0,
            y: 0,
            z: 10,

            on_add: function(game){
                this.game = game
                this.input = game.input
                /*this.sprite = new g.Spritesheet(game.images["seth.png"], 3, 4)
                                   .animate([0, 1, 2], 100) 
                                   .bind(this)
               */
               this.sprite = new g.Spritesheet(game.images["warrior_90px.png"], 1, 1).pause().bind(this)
               game.add(this.sprite)
            },
            update: function(td){
                
                // --- HANDLE MOVEMENT --- // 
                function move(object, vector, speed){

                        var x = vector.x,
                            y = vector.y 

                        // not moving 
                        if ( !x && !y ) return

                        // diagonally moving 
                        if ( x && y ) {
                            object.x += x * speed * 0.7
                            object.y += y * speed * 0.7
                            return 
                        }
                       
                        // horizontal or vertical movement
                        if ( x ) object.x += x * speed 
                        else if ( y ) object.y += y * speed
                }
            
                function input_to_vector(input){
                    var vector = {x: 0, y: 0}

                    if ( input.up ) vector.y -= 1
                    if ( input.down ) vector.y += 1

                    if ( input.left ) vector.x -= 1
                    if ( input.right ) vector.x += 1

                    return vector
                }
            
                var input = this.input,
                    speed = 0.18 * td,
                    vector = input_to_vector(this.input)

                move(this, vector, speed)

                
            }
    })
})
