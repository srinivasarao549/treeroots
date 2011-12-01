define(["lib/compose"], function(compose){
 
    return compose(function(image, object){
            this.image = image
            this._bound = object || this._bound
        },
        {
            offset: true,
            _bound: {
                x: 0,
                y: 0,
                z: 0
            },
            draw: function(camera, context, canvas){
                var bound = this._bound,
                    height = this.image.height,
                    width = this.image.width
                
                if ( this.offset != true ) camera = {x: 0, y: 0}

                if ( bound.y + height > canvas.height + camera.y ) height = canvas.height - bound.y + camera.y
                if ( bound.x + width > canvas.width + camera.x ) width = canvas.width - bound.x + camera.x
                
                if ( width < 0 || height < 0 ) return this

                context.drawImage(this.image,
                                 0, 0, width, height, 
                                ~~ (bound.x - camera.x),~~ (bound.y - camera.y), width, height)

                return this
            
            },
            bind: function(object){
                this._bound = object
                this.z = object.z // i really don't like this line, but can't seem to get setters to work
                return this
            },
            unbind: function(object){
                this._bound = this
                return this
            }
        
        })
})
