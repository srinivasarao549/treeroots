define(["game"], function(Game){
    
    describe("game", function(){
        
        it("must pass itself to the on_add function of an added object, if it exists", function(){
            var game = new Game(),
                obj = {on_add: function(x){ this.x = x }}
                
            game.add(obj)
            expect(obj.x).toBe(game)
        })  

    })



})
