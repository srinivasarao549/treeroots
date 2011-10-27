//--------------------------------//


    // main controlling object
    function Game(){
        this.counter = 0
        this.objects = []
    }
    
    Game.prototype = (function(){
        
        return {
            // object tracking methods
            add: add,
            retrieve: retrieve,
            remove: remove,
            remove_all: remove_all,
            
            // processing methods
            update: update,
            draw: draw
        }
        
        
//----------------------------------------------------------//
//              OBJECT TRACKING METHODS
//----------------------------------------------------------//
    
        function add(object){
            var id = this.counter
            
            this.counter += 1
            
            // store
            this.objects.push(object)
            
            // so we can find with the object itself
            Object.defineProperty(object, "_id", {  value: id,
                                                    writable: false,
                                                    enumerable: false
                                                    })
            return id
        }
        
        function retrieve(objref){
            if ( objref instanceof Object ) objref = objref._id
            return this.objects[objref]
        }
        
        
        function remove(objref){
            if ( objref instanceof Object ) objref = objref._id
            delete this.objects[objref]
        }
        
        function remove_all(){
            this.objects = []
        }
        

//----------------------------------------------------------//
//              PROCESSING METHODS
//----------------------------------------------------------//        
        function update(td, input, canvas){
            this.objects.forEach(function(val){
                if ( val.update ) val.update(td, input, canvas)
            })
        }
        
        function draw(canvas, context){
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.objects.forEach(function(val){
                if ( val.draw ) val.draw(context)
            })            
        }
        
    })()
    
    
    var game = new Game()
