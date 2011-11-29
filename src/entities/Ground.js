define(["lib/compose", "core/graphics"], function(compose, g){
    
    return compose({
            z: 0,
            on_add: function(game){
                this.input = game.input
                this.sprite = new g.Sprite(game.images["ground.jpg"])
                                .bind(this)
                game.add(this.sprite)
           }
    })
})

