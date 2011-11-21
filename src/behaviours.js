define(['core/mixin'], function(mixin){
    
    var b = {};

// ---- POSITION/DIMENSION BEHAVIOURS ---- //

    b.position = {
           x: 0,
           y: 0,
           z: 0
        }
        
    b.dimensions = {
        width: 100,
        height: 100
    }

// ---- COLOR/DRAWING BEHAVIOURS ---- //

    b.color = {
            color_r: 0,
            color_g: 0,
            color_b: 0,
            color_a: 1,
            color_string: function(){
                return "rgba("+ this.color_r + "," +
                                this.color_g + "," +
                                this.color_b + "," +
                                this.color_a + ")"
            }
        }


    b.fill_rect = mixin(b.position, b.dimensions, b.color, { 
        draw_fill_rect: function(context, x, y, width, height, color){
            context.fillStyle = color
            context.fillRect(~~x, ~~y, width, height )
        },
        draw: function(offset, context, canvas){
            var offset = offset || {x: 0, y: 0}
            this.draw_fill_rect(context, this.x + offset.x, this.y + offset.y, this.width, this.height, this.color_string())
        }
    })


    b.image = mixin(b.position, b.dimensions, {
        image: undefined,
        draw: function(offset, context, canvas){
            var offset = offset || {x: 0, y: 0}

            this.draw_image(context, 
                this.image,
                this.x + offset.x,
                this.y + offset.y,
                this.image.width,
                this.image.height
                )
        },
        draw_image: function(context, image, x, y, width, height, clip_x, clip_y, clip_width, clip_height){
            var canvas = this.canvas
    
            if ( canvas ) {
                if ( x + width > canvas.width ) width = canvas.width - x
                if ( y + height > canvas.height ) height = canvas.height - y
            }
            
                context.drawImage(image,
                                 x, 
                                 y, 
                                 width, 
                                 height,
                                 clip_x, 
                                 clip_y, 
                                 clip_width, 
                                 clip_height 
                                )
        }
    })



// ---- MOVEMENT BEHAVIOURS ---- //
    b.move_angle = mixin(b.position, {
        velocity: 0.25,
        angle: 0,
        
        move_angle: function(td){
            var velocity = this.velocity * td,
                angle = this.angle
        
            this.x += Math.cos(angle) * velocity
            this.y += Math.sin(angle) * velocity
        
            return velocity
        }
    })


// ---- RETURN ---- //

    return b
})
