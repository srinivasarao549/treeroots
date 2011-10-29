
!function(){
    
    // all drawn things must have an x, y and z property
    traits.position = {
           x: 0,
           y: 0,
           z: 0
        }
        
    traits.color = {
            color_r: 0,
            color_g: 0,
            color_b: 0,
            alpha: 0,
            set_color: function(r, b, g, a){
                this.color_r = Math.floor(r * 255)
                this.color_g = Math.floor(g * 255)
                this.color_b = Math.floor(b * 255)
                this.color_alpha = a
            },
            get_color: function(){
                return "rgba("+ this.color_r + "," +
                                this.color_b + "," +
                                this.color_g + "," +
                                this.color_alpha + ")"
                }
        }

    traits.fillRect = entity.mixin({
        height: 10,
        width: 10,
        draw: function(context, cam){
            var style_cache = context.fillStyle

            context.fillStyle = this.get_color()
            context.fillRect( ~~ (this.x - cam.x), ~~ (this.y - cam.y), 
                                                this.width, this.height)            
            context.fillStyle = style_cache                
                        
        }
    }, traits.position, traits.color)
    
    
    traits.drawImage = entity.mixin({
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
    }, traits.position)
    
    traits.drawSpritesheet = entity.mixin({
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
        },
        
        
    }, traits.drawImage)
    
}()

