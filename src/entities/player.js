
    !function(){
        
        var Player = function(){
            this.x = 0
            this.y = 0
        }
        
        Player.prototype = new Entity()
        
        Player.prototype.draw = function(context){
            context.fillRect(0, 0, 100, 100)
        }
                
                
        game.constructors["Player"] = Player
        
    }()
    