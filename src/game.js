define(["core/mixin", "core/objectManager"], function(mixin, ObjectManager){

    var Game = function(){
        this.objects = []
        this.camera = {x: 0, y: 0}
        
    }

    Game.prototype = new ObjectManager()

    mixin((function(){
        
        return {
            update: update,
            draw: draw
        }
 
       function update(td, input, canvas){
            this.objects.forEach(function(val){
                if ( val.update ) val.update(td, input, canvas)
            })
            
        }
        
        function draw(canvas, context){
            var camera = this.camera
            
            if ( this.objects_modified ) {
                this.objects.sort(function(a, b){
                return a.z - b.z
                })
                this.objects_modified = false
            }
            
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.objects.forEach(function(obj){
                if ( obj.draw ) obj.draw(context, camera)
            })
            
        }
        
    })(), Game.prototype)

    return Game
})
