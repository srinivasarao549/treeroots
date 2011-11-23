require(['entities', 'game', 'level', 'lib/bean'], function(entities, Game, Level, bean){
    
   var canvas = document.getElementById("treeroots"),
        game = new Game(canvas), 
        level = new Level(game, entities)

    bean.add(document, 'mousemove', function(e){
        game.input.mousex = e.clientX - canvas.offsetLeft;
        game.input.mousey = e.clientY - canvas.offsetTop;
    })
    
    bean.add(document, 'keydown', function(e){
         var k = e.which,
                input = game.input
            
            if ( k == 65 ) 
                input.left = true
            else if ( k == 68 ) 
                input.right = true
            else if ( k == 87 )
                input.up = true
            else if ( k == 83 )
                input.down = true
        
    })

    
    bean.add(document, 'keyup', function(e){
         var k = e.which,
                input = game.input
            
            if ( k == 65 ) 
                input.left = false
            else if ( k == 68 ) 
                input.right = false
            else if ( k == 87 )
                input.up = false
            else if ( k == 83 )
                input.down = false
    })


    level.load({images: ["resources/images/seth.png", "resources/images/floor_1.png", "resources/images/cursor.png"],
                objects: [
                     {type: "Player"}, {type: "Cursor"}, {type: "Ground"}
                ]})

   !function update(){
        !function(){ 
            if (level.loaded != true ) return
            game.update(16)
            game.draw()
        }()

        setTimeout(update, 16) // replace for flywheel later
    }()
})
