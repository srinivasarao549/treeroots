define(["lib/compose", "core/graphics"], function(compose, g){
    
    return compose({
        init: function(game){
            this.input = game.input
            this.sprite = new g.Sprite(game.images["cursor.png"])
        },
        draw: function(offset, context, canvas){
            context.drawImage(this.sprite.image, this.x, this.y)
        },
        update: function(td){
            this.x = this.input.mousex
            this.y = this.input.mousey
        }
    })
})
