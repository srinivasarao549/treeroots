require(['entities', 'game'], function(entities, Game){
    
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(canvas),
        cursor = new entities.Cursor()

    console.log(cursor)
 
    game.input = {
        mousex: 20,
        mousey: 20
    }
    
    game.add(cursor)
    console.log(cursor)

   !function update(){
        game.update()
        game.draw()
        setTimeout(update, 10)
    }()
})
