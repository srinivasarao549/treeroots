define(["lib/compose", "core/graphics/all"], function(compose, g){
    
    return compose({
        z: 20,
        on_add: function(game){
            this.input = game.input
            this.sprite = new g.Sprite(game.images["cursor.png"]).bind(this)
            console.log(this.sprite.z)
            game.add(this.sprite)
        },
        update: function(td){
            this.x = this.input.mousex - (this.sprite.image.width/2)
            this.y = this.input.mousey - (this.sprite.image.height/2)
        }
    })
})
