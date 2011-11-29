define(["lib/compose", "core/objectManager"], function(compose, ObjectManager){

    return compose(ObjectManager, function(canvas){
        this.objects = []
        this.camera = {x: 0, y: 0}
        
        if ( canvas ) {
            this.canvas = canvas
            this.context = canvas.getContext("2d")       
        }
    
        this.input = {}
        this.images = {}

    },
    {

     
        // EVENTS

        //// Game.add
        //
        // Extends ObjectManager.add to call an object's on_add method
        //
        add: function(object){
            ObjectManager.prototype.add.apply(this, arguments)
            if ( object.on_add ) object.on_add(this)
        },

        //// Game.remove
        //
        // Extends ObjectManager.remove to call an object's on_remove method
        remove: function(object){
            ObjectManager.prototype.remove.apply(this, arguments)
            if ( object.on_remove ) object.on_remove()
        },

        //// Game.remove_all
        //
        // Extends ObjectManager.remove_all to call *all* objects' on_remove methods
        remove_all: function(){
            this.objects.forEach(function(object){
                if ( object.on_remove ) object.on_remove()
            })
            
            ObjectManager.prototype.remove_all.apply(this, arguments)
        },

        //// Game.update
        //
        // Updates all functions with the arguments passed in, so that
        // each object can update their own state
        //
        update: function(td, input, canvas){
            this.objects.forEach(function(obj){
                if ( obj.update ) obj.update(td, input, canvas)
            })

        },

        //// Game.draw
        //
        //  Orders Game.objects by their z property, then redraws scene
        //  by clearing canvas then firing the 'draw' event on all objects
        //
        draw: function(){
            var camera = this.camera,
                context = this.context,
                canvas = this.canvas

            // Updates the z sorting only if there's been a new item added, currently
            if ( this.objects_modified ) {
                this.objects.sort(function(a, b){
                    // handle the case where a.z or b.z are undefined

                    if ( !a.z ) return -1
                    if ( !b.z ) return 1

                    // handle normal cases
                    return a.z - b.z
                })
                this.objects_modified = false
              }

            // clears all of canvas
            this.context.clearRect(0, 0, canvas.width, canvas.height)
        
            // calls object methods to redraw themselves
            this.objects.forEach(function(obj){
               if ( obj.draw ) obj.draw(camera, context, canvas)
            })
        }

    })
    
})
