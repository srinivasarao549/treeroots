
    entities.Ground = function(){
        core.mixin(mixins.draw_image, this)
        this.image = new Image()
        this.image.src = "resources/images/ground.jpg"
    }
