

    entities.Ground = function(){
        this.x = 0
        this.y = 0
        
        this.image = new Image()
        this.image.onload = function(){

        }
        
        this.image.src = 'resources/images/ground.jpg'
        
        this.draw = function(context){
            var xy = entities.camera.apply_camera(this)                
            context.drawImage(this.image, xy.x, xy.y)
        }
    
    }