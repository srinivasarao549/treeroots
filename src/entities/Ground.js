define(["lib/compose", "core/graphics/all"], function(compose, g){
    
    return compose({
            x: 0,
            y: 0,
            z: 0,
            on_add: function(game){
                this.input = game.input
                this.sprite = game.create("Sprite")
                                .init(game.images["ground.jpg"])
                                .bind(this)
           }
    })
})

