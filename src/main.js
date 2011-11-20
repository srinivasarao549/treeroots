require(['entities', 'game', 'level', 'lib/bean'], function(entities, Game, Level, bean){
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(canvas), 
        level = new Level(game, entities)
    
    bean.add(canvas, 'mousemove', function(e){
        game.input.mousex = e.clientX - canvas.offsetLeft;
        game.input.mousey = e.clientY - canvas.offsetTop;
    })

    level.load({images: ["resources/images/seth.png", "resources/images/ground.jpg"],
                objects: [
                    {type: "Cursor"}, {type: "Ground"}
                ]})

   !function update(){
        !function(){ 
            if (level.loaded == false ) return
            game.update()
            game.draw()
        }()

        setTimeout(update, 16) // replace for flywheel later
    }()
})
