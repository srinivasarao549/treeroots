require(['entities', 'game'], function(entities, Game){
    
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(canvas),
        cursor = new entities.Cursor()

    canvas.onmousemove = function(e){
        game.input.mousex = e.offsetX;
        game.input.mousey = e.offsetY;
    }
    
    game.add(cursor)

   !function update(){
        game.update()
        game.draw()
        setTimeout(update, 16) // replace for flywheel later
    }()
})
