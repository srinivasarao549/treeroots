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
            color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
                string: function(){
                    return "rgba("+ this.r + "," +
                                    this.g + "," +
                                    this.b + "," +
                                    this.a + ")"
                }
                
           }
        }


    b.fill_rect = mixin(b.position, b.dimensions, b.color, { 
        draw_fill_rect: function(context, x, y, width, height, color){
            context.fillStyle = color
            context.fillRect(~~x, ~~y, width, height )
        },
        draw: function(offset, context, canvas){
            var offset = offset || {x: 0, y: 0}
            this.draw_fill_rect(context, this.x + offset.x, this.y + offset.y, this.width, this.height, this.color.string())
        }
    })

    b.image = mixin(b.position, b.dimensions, {
        image: undefined,
        draw: function(offset, context, canvas){
            var offset = offset || {x: 0, y: 0}
            
            this.draw_image(context, 
                this.image,
                this.x - offset.x,
                this.y - offset.y,
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
                    
                if ( arguments.length != 10 )
                    context.drawImage(image,
                                     x, 
                                     y, 
                                     width, 
                                     height
                                    )
                else 
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


    b.spritesheet = mixin(b.image, {
        spritesheet: {
            sprite_height: undefined,
            sprite_width: undefined,
            current_sprite: [0, 0],
            max_rows: undefined, 
            max_cols: undefined,
            next_sprite: function(){
                this.current_sprite[0] += 1
                if ( this.current_sprite[0] >= this.max_cols ) this.current_sprite[0] = 0
            },
            set_spritesheet: function(image, dimensions){
                this.spritesheet = image
                this.max_cols = Math.floor(image.width / dimensions[0])
                this.max_rows = Math.floor(image.height / dimensions[1])
                this.sprite_width = dimensions[0]
                this.sprite_height = dimensions[1]
            },
            set_animation: function(order, length){
                var ani = this.animation
                
                ani.order_index = 0
                ani.order = order
                ani.timeout = length
            },
            animate: function(td){
                var ani = this.animation
                
                ani.timer += td
                if ( ani.timer > ani.timeout ) {
                    ani.timer = 0
                    ani.order_index += 1
                    if ( ani.order_index > ani.order.length - 1) ani.order_index = 0
                    this.current_sprite[0] = ani.order[ani.order_index]
                }
            },
            animation: {
                order_index: 0,
                order: [],
                timer: 0,
                timeout: 500
            }
        },
        draw: function(offset, context, canvas){
            var ss = this.spritesheet

            this.draw_image(context, 
                ss.spritesheet,
                ss.current_sprite[0] * ss.sprite_width,
                ss.current_sprite[1] * ss.sprite_height,
                ss.sprite_width,
                ss.sprite_height,
                this.x - offset.x,
                this.y - offset.y,
                ss.sprite_width,
                ss.sprite_height
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
