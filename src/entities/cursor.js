

    entities.Cursor = function(){
        this.layer = 0
        this.x = Math.random() * 1000
        this.y = Math.random() * 1000
        this.radius = 10
        this.draw = function(context){
            context.fillRect(this.x, this.y, 10, 10)
            context.fill();
        }

        this.update = function(td, input){
            this.x = input.mouseX
            this.y = input.mouseY
            
            if ( input.click ) {
                var xy = entities.camera.reverse_apply_camera(this)
                game.add(new entities.Explosion(xy.x, xy.y, 100, 100))
                
            }
        }

    }
