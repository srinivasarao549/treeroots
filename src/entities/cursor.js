

    entities.Cursor = function(){

        // inherit ^^
        entity.mixin(this, traits.fillRect)
        
        this.height = 5
        this.width = 5
        this.set_color(0, 0.25, 1, 1)
                
        this.update = function(td, input){
            this.x = input.mouseX
            this.y = input.mouseY
        
            if ( input.click ){
                var explosion = new entities.Explosion(this.x, this.y, 30, 40, 100)
                game.add(explosion)
            } 
        }
    }

