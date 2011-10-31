//--------------------------------//


    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
                    
        // initialise game
        var context = canvas.getContext("2d"),
            input = {}
        
        core.mixin({    
            event: require("bean") || undefined,
            collision: require("clash").check_collision || undefined,
            spin: require("flywheel") || undefined
        }, core)
        
        // handle keyboard input
        core.event.add(document, 'keydown', function(e){
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
        
        core.event.add(document, 'keyup', function(e){
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
            core.event.add(document, 'mousemove', function(e){
                input.mouseX = e.clientX - canvas.offsetLeft
                input.mouseY = e.clientY - canvas.offsetTop
            })
        
            core.event.add(canvas, 'mousedown', function(e){
                input.mousedown = true
                input.click = true
            })
            
            core.event.add(canvas, 'mouseup', function(e){
                input.mousedown = false
            })
        }()

        // loop
        core.spin(function(time_delta){            
            game.update(time_delta, input, canvas)
            game.draw(canvas, context)
            
            input.click = false 

        }).start()
        
        // load objects
        !function(){
            var cursor = new entities.Cursor(),
                ground = new entities.Ground(),
                player = new entities.Player()

            game.add(player)
            game.add(cursor)
            game.add(ground)
        }()

    }