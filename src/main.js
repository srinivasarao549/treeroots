require(['entities', 'game'], function(entities, Game){
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(canvas)

    canvas.onmousemove = function(e){
        game.input.mousex = e.offsetX;
        game.input.mousey = e.offsetY;
    }
    
    game.add(new entities.Cursor)
    game.add(new entities.Ground)


   !function update(){
        game.update()
        game.draw()
        setTimeout(update, 16) // replace for flywheel later
    }()
})
