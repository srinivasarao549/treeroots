require(['entities', 'game', 'lib/bean'], function(entities, Game, bean){
    
    var canvas = document.getElementById("treeroots"),
        game = new Game(canvas)
    
    bean.add(canvas, 'mousemove', function(e){
        game.input.mousex = e.clientX - canvas.offsetLeft;
        game.input.mousey = e.clientY - canvas.offsetTop;
    })
    
    game.add(new entities.Cursor)
    game.add(new entities.Ground)

   !function update(){
        game.update()
        game.draw()
        setTimeout(update, 16) // replace for flywheel later
    }()
})
