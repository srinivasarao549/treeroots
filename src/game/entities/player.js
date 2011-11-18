
    entities.Player = function(){
        var img = new Image()
        img.src = "resources/images/seth.png"

        return core.mixin(mixins.draw_image, mixins.moveByAngle, {
            z: 3,
            image: img,
            update: function(td, input){
                var speed = 0.4 * td,
                    directiony = 0,
                    directionx = 0
                
                if ( input.up ) directiony += 1
                if ( input.down ) directiony -= 1
                if ( input.left ) directionx -= 1
                if ( input.right ) directionx += 1
                
                if ( directiony || directionx ) this.velocity = 1
                else this.velocity = 0
                
                if ( !directionx ) this.angle = directiony * Math.PI 

                this.moveByAngle(td)

            
            }
        })
    }
