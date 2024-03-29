define(["lib/compose"], function(compose){

    return compose({
            x: 0,
            y: 0,
            z: 10,

            on_add: function(game){
                this.game = game
                this.input = game.input
                this.sprite = game.create("Sprite")
                                .init(game.images["warrior_90px.png"])
                                .bind(this)

            },
            update: function(td){
                
                // --- HANDLE MOVEMENT --- // 
                function move_by_vector(object, vector, speed){

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

                move_by_vector(this, vector, speed)

                // --- CAMERA --- //
                function object_follow(object, camera, offset){
                    camera.x = ~~object.x - offset.x
                    camera.y = ~~object.y - offset.y
                }            

                function offset_to_center(container, object){
                    var offset = {}
                    offset.x = ~~((container.width/2) - (object.width/2))
                    offset.y = ~~((container.height/2) - (object.height/2))
                    return offset
                }
                
                object_follow(this, this.game.camera, offset_to_center(this.game.canvas, this.sprite.image))

                // --- SPEECH BUBBLE DETECT --- //
                if ( this.x > 200 && !this.bubble ) {
                    this.bubble = this.game.create("SpeechBubble");
                    this.bubble.set_text("Internal Dialog:", "I wonder if this wilderness has any burger joints..")
                    this.game.add(this.bubble)
                }  

            }
    })
})
