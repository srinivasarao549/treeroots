define(['core/mixin', 'core/behaviours'], function(mixin, b){
    
    var e = {}

    e.Cursor = function(){
        mixin(b.fill_rect, {
            z: 4,
            color_a: 0.4,
            update: function(td){
            }
        }, this)
    }

    
    e.Player = function(){
        var img = new Image()
        img.src = "resources/images/seth.png"

        return mixin(b.draw_image, b.move_by_angle, {
            z: 3,
            image: img,
            update: function(td){
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
