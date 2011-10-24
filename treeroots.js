!function(window, undefined){
//--------------------------------//


    // main controlling object
    function Game(){
        
        // private
        var channels = {}
        
        // public        
        return {       
            input: {},
            fire: fire,
            bind: bind,
            unbind: unbind,
            before_fire: before_fire,
            after_fire: after_fire
        }
        
        function before_fire(channel, callback){
            if ( channels[channel] === undefined ) channels[channel] = []
            channels[channel].before = callback
        }
        
        function after_fire(channel, callback){
            if ( channels[channel] === undefined ) channels[channel] = []
            channels[channel].after = callback
        }
        
        function fire(channel, message){
            var c = channels[channel]
            if ( !c ) c = []
            
            if ( c.before ) c.before()
            c.forEach(function(callback){
                if ( callback !== undefined ) callback(message)
            })
            if ( c.after ) c.after()
        }
        
        function bind(channel, callback){    
            if ( channels[channel] === undefined ) channels[channel] = []
            channels[channel].push(callback)
            return channels[channel].length - 1
        }
        
        function unbind(channel, id){
            delete channels[channel][id]
        }
    }
    
    var game = new Game()

    // collection for entities
    var entities = {}

    !function(){
        
        entities.Cursor = function(){
        }
        
    }()
    !function(){
    
        entities.Player = function(){
            this.layer = 0
            this.x = 0
            this.y = 0
        
            this.draw = function(context){
                var style_cache = context.fillStyle
                context.fillStyle = "rgba(100, 0, 100, 0.8)"
                
                context.fillRect(this.x, this.y, 40, 40)
            
                context.fillStyle = style_cache                
            }
            
            this.update = function(e){
                var input = e.input, 
                    speed = 0.25 * e.td,
                    directionX = 0,
                    directionY = 0
                    
                    this.x = input.mouseX
                    this.y = input.mouseY
        /*
                if ( input.right ) directionX += 1
                if ( input.left ) directionX -= 1
                if ( input.down ) directionY += 1
                if ( input.up ) directionY -= 1
                
                // movement
                if ( directionX !== 0 || directionY !== 0 ){
                    var angle = Math.atan2(directionY, directionX)
                    this.x += Math.cos(angle) * speed
                    this.y += Math.sin(angle) * speed
                }
          */
          
            }
            
            game.bind("draw", this.draw.bind(this))
            game.bind("update", this.update.bind(this))
        
        }
    
    }()
//--------------------------------//


    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        // helper modules
        var flywheel = require("flywheel"),
            bean = require("bean"),
            clash = require("clash")
            
        // initialise game
        var context = canvas.getContext("2d"),
            input = {}

        game.check_collision = clash().check
        
        // handle keyboard input
        bean.add(document, 'keydown', function(e){
            var k = e.which

            if ( k == 65 ) 
                input.left = true
            else if ( k == 68 ) 
                input.right = true
            else if ( k == 87 )
                input.up = true
            else if ( k == 83 )
                input.down = true
        
        }) 
        
        bean.add(document, 'keyup', function(e){
            var k = e.which
                        
            if ( k == 65 ) 
                input.left = false
            else if ( k == 68 ) 
                input.right = false
            else if ( k == 87 )
                input.up = false
            else if ( k == 83 )
                input.down = false
        
        })
        
        // handle mouse input
        !function(){
            bean.add(document, 'mousemove', function(e){
                input.mouseX = e.clientX - canvas.offsetLeft
                input.mouseY = e.clientY - canvas.offsetTop
            })
        
            bean.add(canvas, 'mousedown', function(e){
                input.mousedown = true
                input.mousedown_fresh = true
            })
            
            bean.add(canvas, 'mouseup', function(e){
                input.mousedown = false
            })
        }()

        
        // load objects
        !function(){
            var player = new entities.Player(),
                cursor = new entities.Cursor()
                
        }()
        
        game.before_fire("draw", function(){
            context.clearRect(0, 0, canvas.width, canvas.height)
        })
         
        // loop
        flywheel(function(time_delta){
            
            game.fire("update", {time_delta: time_delta, input: input})
            game.fire("draw", context)

            console.log(input)
        }).start()

    }

}(this)