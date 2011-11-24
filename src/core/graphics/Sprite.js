define(["lib/compose"], function(compose){
 
    return compose(function(img){
            compose.call(this, {
                image: img,
                x:0,
                y:0
            })
        },
        {
            draw: function(camera, context, canvas){
                var bound = this._bound || this,
                    height = this.image.height,
                    width = this.image.width 

                if ( bound.y + height > canvas.height ) height = canvas.height - bound.y
                if ( bound.x + width > canvas.width) width = canvas.width - bound.x
                
                if ( width < 0 || height < 0 ) return this

                context.drawImage(this.image,
                                 0, 0, width, height, 
                                ~~ (bound.x - camera.x),~~ (bound.y - camera.y), width, height)

                return this
            },
            bind: function(object){
                this._bound = object
                this.z = object.z
                return this
            },
            unbind: function(object){
                this._bound = undefined
                this.z = 0
                return this
            }

        })
})
