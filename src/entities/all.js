!function(){

    var modules = ["Cursor", "Player", "Ground", "GameDimmer", "TileMap", "SpeechBubble"],
        folder = "entities/",
        full_path = modules.map(function(val){ return folder + val})

    define(full_path, function(){
        var ret_obj = {},
            args = arguments
        
        modules.forEach(function(val, key){ 
                    ret_obj[val] = args[key]
            })

        return ret_obj
    })

}()
