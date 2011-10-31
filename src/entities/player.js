
    entities.Player = function(){
        var img = new Image()
        img.src = "resources/images/seth.png"

        return core.mixin(mixins.draw_image, {
            z: 3,
            image: img,
            update: function(){
            }
        })
    }
