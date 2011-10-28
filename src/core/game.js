//--------------------------------//


    // main controlling object
    function Game(){
        this.objects = []
        this.draw_buffer = []
        this.camera = { x: 0,
                        y: 0
                    }
    }
    
    Game.prototype = (function(){
        
        return {
            // object tracking methods
            add: add,
            remove: remove,
            remove_all: remove_all,
            
            find: find,
            find_nearest: find_nearest,
            find_by_id: find_by_id,
            
            // processing methods
            update: update,
            draw: draw
        }
        
        
//----------------------------------------------------------//
//              OBJECT TRACKING METHODS
//----------------------------------------------------------//
    
        function add(object){
            // store
            this.objects.push(object)
            
        }        
                
        function remove(object){
            this.objects.splice(this.objects.indexOf(object), 1)            
        }
        
        function remove_all(){
            this.objects = []
        }
        
        function find(type, obj_set){
            var objs = obj_set || this.objects,
                return_objs = []
            
            objs.forEach(function(o){
                if ( o.constructor.name == type ) 
                    return_objs.push(o)
            })
            return return_objs
        }
        
        function find_nearest(reference_object, obj_set){
            var objs = obj_set || this.objects,
                nearest_obj, nearest_distance
            
            objs.forEach(function(o){
                var diffx = Math.abs(reference_object.x - o.x),
                    diffy = Math.abs(reference_object.y - o.y),
                    distance = diffy*diffy + diffx*diffx
                    
                if ( nearest_distance === undefined ){    
                    nearest_distance = distance
                    nearest_obj = o
                } else if ( nearest_distance > distance ){
                    nearest_distance = distance
                    nearest_obj = o
                }
            })

            return nearest_obj
        }

        function find_by_id(id, obj_set){
            var objs = obj_set || this.objects,
                obj = null
                
            objs.forEach(function(o){
                if ( o.id == id ) obj = o
            })
            
            return obj
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
            var camera = this.camera
            
            this.draw_buffer = []
            this.objects.forEach(function(val){
                this.draw_buffer.push(val)
            }.bind(this))
            
            this.draw_buffer.sort(function(a, b){
                return a.z - b.z
            })
            
            context.clearRect(0, 0, canvas.width, canvas.height)
            this.draw_buffer.forEach(function(obj){
                if ( obj.draw ) obj.draw(context, camera)
            })            
        }
        
    })()
    
    
    var game = new Game()
