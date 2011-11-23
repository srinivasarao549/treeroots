define(["core/graphics"], function(g){
    
    var Cursor = function(){}

    Cursor.prototype = {
    
        init: function(game){
            this.sprite = new g.Sprite(game.images["cursor.png"])
        },
        draw: function(offset, context, canvas){
            this.sprite.draw(offset, context, canvas)
        },
        update: function(td){

        }

    }



    return Cursor

})
