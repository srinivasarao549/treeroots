define(['core/mixin', 'behaviours'], function(mixin, b){
    
    var e = {}

    e.Cursor =  mixin.ctor(b.image, 
            {
            z: 4,
            color_a: 0.4,
            update: function(td){
                this.x = this.input.mousex
                this.y = this.input.mousey
            },
            init: function(game){
                this.game = game
                this.input = game.input
                this.image = game.images["cursor.png"]
            }
        })
    
    e.Player = mixin.ctor(b.image,
       {
        z: 3,
        init: function(game){
            this.game = game
            this.image = game.images["seth.png"]
        },
    })

    e.Ground = mixin.ctor(b.image, 
            {
            init: function(game){
                this.game = game
                this.image = game.images["floor_1.png"]
            }
        })

// ---- RETURN ---- //
    return e
})
