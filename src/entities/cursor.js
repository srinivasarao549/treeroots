

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
            
            if ( input.click ) for ( var i = 0; i < 100; i ++ ) game.add(new entities.Explosion(this.x, this.y))
        }

    }
