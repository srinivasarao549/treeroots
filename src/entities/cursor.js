

    entities.Cursor = function(){

        // inherit ^^
        entity.mixin(this, traits.drawImage)

        this.load_image("resources/images/cursor.png")
        
        this.z = 4
        this.draw = function(context){
            var mid_x = this.image.width/2,
                mid_y = this.image.height/2
                
            context.drawImage(this.image, this.x - mid_x, this.y - mid_y)
        }
        
        this.update = function(td, input){
            this.x = input.mouseX
            this.y = input.mouseY
        
            if ( input.click ){
                var explosion = new entities.Explosion(this.x, this.y, 100, 40, 100)
                game.add(explosion)
            } 
        }
    }

