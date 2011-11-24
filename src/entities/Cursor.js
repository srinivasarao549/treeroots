define(["lib/compose", "core/graphics"], function(compose, g){
    
    return compose({
        z: 2,
        init: function(game){
            this.input = game.input
            this.sprite = new g.Sprite(game.images["cursor.png"])
                                .bind(this)
            game.add(this.sprite)
        },
        update: function(td){
            this.x = this.input.mousex
            this.y = this.input.mousey
        }
    })
})
