
        
    mixins.color = {
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


    mixins.fill_rect = core.mixin(mixins.position, mixins.dimensions, mixins.color, { 
        draw_fill_rect: function(context, x, y, width, height, color){
            var style_cache = context.fillsStyle

            context.fillStyle = color
            context.fillRect(~~x, ~~y, width, height )
            context.fillStyle = style_cache
        },
        draw: function(context, offset){
            var offset = offset || {x: 0, y: 0}
            this.draw_fill_rect(context, this.x + offset.x, this.y + offset.y, this.width, this.height, this.color_string())
        }
    })


    mixins.draw_image = core.mixin(mixins.position, mixins.dimensions, {
        image: undefined,
        draw: function(context, offset){
            var offset = offset || {x: 0, y: 0}
            
            this.draw_image(context, 
                            this.image,
                            this.x + offset.x,
                            this.y + offset.y,
                            this.image.width,
                            this.image.height)
        },
        draw_image: function(context, image, x, y, width, height, clip_x, clip_y, clip_width, clip_height){

            if ( arguments.length !== 10) 
                context.drawImage(image,
                                  x,
                                  y, 
                                  width, 
                                  height)
            else 
                context.drawImage(image,
                                 clip_x, 
                                 clip_y, 
                                 clip_width, 
                                 clip_height, 
                                 x, 
                                 y, 
                                 width, 
                                 height)
        }
    })

/*
    
    mixins.drawImage = core.mixin(mixins.position, {
        image: undefined,
        scale: 1,
        draw: function(context, cam){
            context.drawImage(this.image, 
                            ~~ (this.x - cam.x), 
                            ~~ (this.y - cam.y),
                            this.image.width * this.scale,
                            this.image.height * this.scale)
        },
        load_image: function(src, callback){
            this.image = new Image()
            this.image.onload = function(){
                if ( callback instanceof Function ) callback()
            }.bind(this)
            this.image.src = src
        }
    })
    
    mixins.drawSpritesheet = core.mixin(mixins.drawImage,
        
        {
        sprite_height: undefined,
        sprite_width: undefined,
        sprite_row: 0,
        sprite_col: 0,
        draw: function(context, cam){
            context.drawImage(this.image, 
                            this.sprite_width * this.sprite_col,
                            this.sprite_height * this.sprite_row,
                            this.sprite_width,
                            this.sprite_height,
                            ~~ (this.x - cam.x), 
                            ~~ (this.y - cam.y),
                            this.sprite_width * this.scale,
                            this.sprite_height * this.scale
                            )
        }
    })

*/