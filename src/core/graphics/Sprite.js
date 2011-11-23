define(["lib/compose"], function(compose){
 
    return compose(function(img){
            compose.call(this, {
                image: img,
                x:0,
                y:0,
                
            })
        },
        {
            draw: function(camera, context, canvas){
                var bound = this._bound || this

                context.drawImage(this.image, bound.x - camera.x, bound.y - camera.y)
                return this
            },
            bind: function(object){
                this._bound = object
                return this
            }

        })
})
