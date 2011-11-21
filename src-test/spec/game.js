define(["game"], function(Game){

describe("game", function(){
    
    describe("add", function(){

        it("must pass itself to the init function of an added object, if it exists", function(){
            var game = new Game(),
                obj = {init: function(x){ this.x = x; }}
                
            game.add(obj)
            expect(obj.x).toBe(game)
        })

    })

})

})
