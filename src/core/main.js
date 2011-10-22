//--------------------------------//



    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        // helper modules
        var flywheel = require("flywheel"),
            bean = require("bean"),
            clash = require("clash")
            
        // initialise game
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        game.check_collision = clash().check
        
        // handle keyboard input
        bean.add(document, 'keydown', function(e){
            var k = e.which,
                input = game.input
            
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
            var k = e.which,
                input = game.input  
            
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
            var input = game.input
                        
            bean.add(document, 'mousemove', function(e){
                input.mouseX = e.x - canvas.offsetLeft
                input.mouseY = e.y - canvas.offsetTop
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
                
            
            game.add_entity(player)
            game.add_entity(cursor)
        
        }()
        
        // loop
        flywheel(function(time_delta){
            game.update(time_delta)
            game.draw_all()
            
            // clear input 
            game.input.mousedown_fresh = false
        }).start()

    }