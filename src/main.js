require(['entities', 'game'], function(entities, Game){
    
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(canvas),
        cursor = new entities.Cursor()

    game.add(cursor)

    !function update(){
        game.update()
        game.draw()
        setTimeout(update, 10)
    }()
})
