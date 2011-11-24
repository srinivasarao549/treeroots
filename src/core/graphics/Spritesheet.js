define(["./Sprite", "lib/compose"], function(Sprite, compose){

    return compose(Sprite, 
        function(img, col_num, row_num){
            this.image = img
            this.sprite = {
                x: 0,
                y: 0,
                width: Math.floor(img.width/col_num),
                height: Math.floor(img.height/row_num)
            }
            this.spritesheet_dim = {
                width: col_num,
                height: row_num,
            }
        },
        {
        
            animation: {
                timer: 0,
                timeout: undefined,
                array: undefined,
                index: 0
            },
            step: function(td){
                var anim = this.animation
 
                anim.timer -= td
                
                if ( anim.timer <=  0 ){
                    anim.timer = anim.timeout
                    anim.index += 1
                    if ( anim.index > anim.array.length - 1) anim.index = 0
                    
                    this.sprite.x = anim.array[anim.index]
                } 
                
                return this


            },
            animate: function(array, timeout){
                var anim = this.animation

                // take new animation specification
                anim.array = array 
                anim.timeout = timeout
                anim.timer = timeout

                return this
            },
            draw: function(camera, context, canvas){
                var bound = this._bound || this,
                    height = this.sprite.height,
                    width = this.sprite.width,
                    draw_x = this.sprite.x * this.sprite.width,
                    draw_y = this.sprite.y * this.sprite.height

                if ( bound.y + height > canvas.height ) height = canvas.height - bound.y
                if ( bound.x + width > canvas.width) width = canvas.width - bound.x
                
                if ( width < 0 || height < 0 ) return this

                context.drawImage(this.image,
                                 draw_x, draw_y, width, height, 
                                ~~ (bound.x - camera.x),~~ (bound.y - camera.y), width, height)

                return this
        
            },
            update: function(td){
                this.step(td)
            }
    })
})
