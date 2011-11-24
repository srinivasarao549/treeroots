define(["lib/compose"], function(compose){

    // dimmer fades the whole scene up and down

    return compose({
        opacity: 1,
        color: "0, 0, 0",
        z: 1000,
        draw: function(camera, context, canvas){
            if ( this.opacity <= 0 ) return 

            context.fillStyle = "rgba(" + this.color + "," + this.opacity + ")"
            context.fillRect(0, 0, canvas.width, canvas.height)
        },
        // fade up at start of level
        update: function(td){
            if ( this.opacity > 0 ) this.opacity -= td * 0.001
        }
    })


})
