!function(){

    var modules = [ 
                    // immediate modules
                    "game",
                    "level",
                    "objectManager",
        

                    // sub-packages
                    "graphics/*",
                    ],
        folder = "core/",
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
