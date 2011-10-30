

    entities.Cursor = function(){
        
        core.mixin(mixins.fill_rect, {
            z: 4,
            color_a: 0.4,
            update: function(td, input){
                this.x = input.mouseX
                this.y = input.mouseY
            }
        }, this)
        
    }

