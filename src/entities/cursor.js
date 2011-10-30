

    entities.Cursor = function(){

        // inherit ^^
        entity.mixin(mixins.drawImage, this)

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
                new entities.Explosion(this.x + game.camera.x, this.y + game.camera.y, 100, 0.1, 150)
            } 
        }
    }

