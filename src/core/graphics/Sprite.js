define(["lib/compose"], function(compose){
 
    return compose(function(img){
            this.image = img
        },
        {

            draw: function(camera, context, canvas) {
                context.drawImage(this.image, 0, 0)
            }

        })

})
