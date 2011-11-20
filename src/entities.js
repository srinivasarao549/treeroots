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
        return mixin( b.image, b.move_angle, {
            z: 3,
            on_add: function(game){
                this.game = game
                this.image = game.images["resources/images/seth.png"]
            },
            update: function(td){
            }
        })
    }

    e.Ground = function(){
        mixin( b.image, {
            on_add: function(game){
                this.game = game
                this.image = game.images["resources/images/ground.jpg"]
            }
        }, this)
    }

// ---- RETURN ---- //
    return e
})
