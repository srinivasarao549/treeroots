require(["lib/compose"], function(compose, TileMap){

    return compose({
        src: undefined,
        tile_width: 100,
        map: undefined,
        on_add: function(game){
            this.game = game
            build_map(this.map, game.images[this.src], tile_width)
        }
    })

    // return a drawable object given a map and tilesheet
    // assumes 2:1 iso
    function build_map(map, tilesheet_image, tile_width){
    
        function split_tilesheet(tilesheet, width, height){
            var tiles = [],
                tiles_wide = ~~(tilesheet.width/width),
                tiles_high = ~~(tilesheet.height/height)
            
            for ( var row = 0; row < tiles_high; row += 1 ){
                for ( var col = 0; col < tiles_wide; col += 1 ){
                    tiles.push()
                }
            }
            return 
        }

        
        function clip_tile(tilesheet, offset_x, offset_y, width, height){
            
            return 
        }

        function image_to_context(image){
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d")
    
            canvas.drawImage(image, 0, 0)
            return canvas
        }
        
        var tilesheet = image_to_context(tilesheet_image), 
            tiles = split_tilesheet(tilesheet, tile_width, tile_width/2)
    
    }

})
