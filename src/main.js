//--------------------------------//



    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        flywheel(function(time_delta){
            game.update(time_delta)
        }).start()

    }