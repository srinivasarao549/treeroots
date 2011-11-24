define(["lib/compose", "core/objectManager"], function(compose, ObjectManager){

    return compose(ObjectManager, function(canvas){
        this.objects = []
        this.camera = {x: 0, y: 0}
        
        if ( canvas ) {
            this.canvas = canvas
            this.context = canvas.getContext("2d")       
        }

        this.add = function(obj){
            ObjectManager.prototype.add.call(this, obj)
            if ( obj.init ) obj.init(this)
        }
    
        // stores we expect others to populate
        this.input = {}
        this.images = {}
    },
    {
           update: function(td, input, canvas){
                this.objects.forEach(function(val){
                    if ( val.update ) val.update(td, input, canvas)
                })
                
            },
            
           draw: function(){
                var camera = this.camera,
                    context = this.context,
                    canvas = this.canvas
                
                if ( this.objects_modified ) {
                    this.objects.sort(function(a, b){
                    return a.z - b.z
                    })
                    this.objects_modified = false
                }
                
                this.context.clearRect(0, 0, canvas.width, canvas.height)
                this.objects.forEach(function(obj){
                    if ( obj.draw ) obj.draw(camera, context, canvas)
                })
                
            }

        }
     )
    
})
