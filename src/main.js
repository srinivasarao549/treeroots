require(['entities', 'game', 'level', 'lib/bean'], function(entities, Game, Level, bean){
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(canvas), 
        level = new Level(game, entities)

    bean.add(document, 'mousemove', function(e){
        game.input.mousex = e.clientX - canvas.offsetLeft;
        game.input.mousey = e.clientY - canvas.offsetTop;
    })
    

    level.load({images: ["resources/images/seth.png", "resources/images/floor_1.png", "resources/images/cursor.png"],
                objects: [
                     {type: "Player"}, {type: "Cursor"}, {type: "Ground"}
                ]})

   !function update(){
        !function(){ 
            if (level.loaded != true ) return
            game.update()
            game.draw()
        }()

        setTimeout(update, 16) // replace for flywheel later
    }()
})
