//--------------------------------//



    // the function the outside world gets to initialise the game
    window["treeroots"] = function(canvas){
        
        game.canvas = canvas
        game.context = canvas.getContext("2d")

        game.add_object(new game.constructors.Player())

        flywheel(function(time_delta){
            game.update(time_delta)
            game.draw_all()
        }).start()

    }