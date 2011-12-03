require(['entities/all', 'core/game', 'core/level', 'lib/bean', 'lib/flywheel'], function(entities, Game, Level, bean, flywheel){

    // get canvas, game and level
    var canvas = document.getElementById("treeroots"),
        container = document.getElementById("main_container"),
        game = new Game(canvas, entities), 
        level = new Level(game, entities)


    // set up input handlers for game

    bean.add(document, 'mousemove', function(e){
        game.input.mousex = e.clientX - container.offsetLeft;
        game.input.mousey = e.clientY - container.offsetTop;
    })
    
    bean.add(document, 'keydown', function(e){
         var k = e.which,
                input = game.input
            
            if ( k == 65 || k == 37) 
                input.left = true
            else if ( k == 68 || k == 39) 
                input.right = true
            else if ( k == 87 || k == 38)
                input.up = true
            else if ( k == 83 || k == 40)
                input.down = true
        
    })

    
    bean.add(document, 'keyup', function(e){
         var k = e.which,
                input = game.input
            
            if ( k == 65 || k == 37) 
                input.left = false
            else if ( k == 68 || k == 39 ) 
                input.right = false
            else if ( k == 87 || k == 38 )
                input.up = false
            else if ( k == 83 || k == 40 )
                input.down = false
    })


    // Load test level

    level.load({images: ["resources/images/seth.png",
                         "resources/images/floor_1.png",
                         "resources/images/cursor.png",
                         "resources/images/ground.jpg",
                         "resources/images/warrior_100px.png",
                         "resources/images/warrior_90px.png"],
                objects: [
                    {type: "Player"},
                    {type: "Cursor"},
                    {type: "GameDimmer"},
                    {type: "Ground"},
                    {
                        type: "TileMap", 
                        tileset: ["floor_1.png"],
                        map_dim: {width: 10, height: 20},
                        map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                              undefined, 0, undefined, 0, 0, undefined, undefined, undefined, undefined, undefined,
                              undefined, 0, undefined, 0, 0, 0, undefined, 0, 0, 0, 
                              undefined, undefined, undefined, 0, 0, 0, undefined, 0, 0, 0, 
                              undefined, 0, undefined, 0, 0, undefined, undefined, undefined, undefined, undefined,
                              ]
                    
                    } 
            ]})

    // Main engine loop

    flywheel(function(time_delta){

            if (level.loaded != true ) return
            game.update(time_delta)
            game.draw()

    }).start()

})
