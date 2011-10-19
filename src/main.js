//--------------------------------//



    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        // helper modules
        var flywheel = require("flywheel"),
            bean = require("bean"),
            bonzo = require("bonzo")
            
        // initialise game
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        
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
        
        !function(){
            // handle mouse input
            bean.add(canvas, 'mousemove', function(e){
                var input = game.input

                input.mouseX = e.offsetX
                input.mouseY = e.offsetY          
            })
            
        }()

        // load objects
        game.add_object(new game.constructors.Cursor())
        game.add_object(new game.constructors.Player())
        
        // loop
        flywheel(function(time_delta){
            game.update(time_delta)
            game.draw_all()
        }).start()

    }