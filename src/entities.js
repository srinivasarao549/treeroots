define(['core/mixin', 'core/behaviours'], function(mixin, b){
    
    var e = {}

    e.Cursor = function(){
        
        mixin(b.fill_rect, {
            z: 4,
            color_a: 0.4,
            update: function(td, input){
                this.x = input.mouseX
                this.y = input.mouseY
            }
        }, this)
    }

    
    e.Player = function(){
        var img = new Image()
        img.src = "resources/images/seth.png"

        return mixin(b.draw_image, b.moveByAngle, {
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

    e.Ground = function(){
        mixin(b.draw_image, this)
        this.image = new Image()
        this.image.src = "resources/images/ground.jpg"
    }

// ---- RETURN ---- //
    return e
})
