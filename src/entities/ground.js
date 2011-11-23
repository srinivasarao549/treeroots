define(["lib/compose", "core/graphics"], function(compose, g){
    
    return compose(function(){
            this.z_index = 0
        },
        {
            init: function(game){
                this.input = game.input
                this.sprite = new g.Sprite(game.images["floor_1.png"])

           },
            draw: function(c, co, ca){
                this.sprite.draw(c, co, ca)
            }
    })
})
