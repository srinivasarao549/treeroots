define(["lib/compose", "core/graphics/all"], function(compose, g){

    return compose({
        tileset: undefined,
        tile_dim: {width: undefined, height: undefined},
        map: [],
        map_dim: undefined,
        z: 1,
        x: 0, 
        y: 0,
        on_add: function(game){

            // assuming tileset will be an array of resouces ["floor_1.png", "floor_2.png"] etc
            var tileset = this.tileset.map(function(val){ 
                                return game.images[val]
                            }),
                tile_dim = this.tile_dim,
            // open a buffer to draw to
                buffer = document.createElement("canvas"),
                buffer_context = buffer.getContext("2d")
            
            // tile_dim taken form first of tileset
            tile_dim.width = tileset[0].width
            tile_dim.height = tileset[0].height
            
            buffer.width = tile_dim.width * this.map_dim.width
            buffer.height = tile_dim.height * this.map_dim.height

            // draw onto the buffer
            this.map.forEach(function(val, key){
                var tile = tileset[val],
                    row = Math.floor(key/this.map_dim.width),
                    col = key - (this.map_dim.width * row)

                if ( tile === undefined ) return 
                buffer_context.drawImage(tile, tile_dim.width * col,  tile_dim.height * row)
            }.bind(this))

            this.sprite = game.create("Sprite")
                            .init(buffer)
                            .bind(this)
        }
    })

})
