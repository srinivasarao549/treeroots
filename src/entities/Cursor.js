define(["lib/compose"], function(compose){
    
    return compose({
        z: 20,
        on_add: function(game){
            this.input = game.input
            this.sprite = game.create("Sprite")
                            .init(game.images["cursor.png"])
                            .bind(this)

            this.sprite.offset = false
        },
        update: function(td){
            this.x = this.input.mousex - (this.sprite.image.width/2)
            this.y = this.input.mousey - (this.sprite.image.height/2)
        }
    })
})
