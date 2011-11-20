define(['core/mixin', 'behaviours'], function(mixin, b){
    
    var e = {}

    e.Cursor = function(){
        mixin(b.fill_rect, {
            z: 4,
            color_a: 0.4,
            update: function(td){
                this.x = this.input.mousex
                this.y = this.input.mousey
            },
            on_add: function(game){
                this.game = game
                this.input = game.input
            }
        }, this)
    }
    
    e.Player = function(){
        var img = new Image()
        img.src = "resources/images/seth.png"

        return mixin( b.image, b.move_by_angle, {
            z: 3,
            image: img,
            update: function(td){
            }
        })
    }

    e.Ground = function(){
        mixin( b.image, this)
        this.image = new Image()
        this.image.src = "resources/images/ground.jpg"
    }

// ---- RETURN ---- //
    return e
})
