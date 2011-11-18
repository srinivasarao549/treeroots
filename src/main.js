require(['entities', 'game'], function(entities, Game){
    
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(),
        cursor = new entities.Cursor()

    game.add(cursor)

    game.draw(canvas, canvas.getContext("2d"))

})
