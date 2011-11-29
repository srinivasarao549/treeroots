define(["core/game"], function(Game){

describe("game", function(){
    
    describe("add", function(){

        it("must pass itself to the on_add function of an added object, if it exists", function(){
            var game = new Game(),
                obj = {on_add: function(x){ this.x = x; }}
                
            game.add(obj)
            expect(obj.x).toBe(game)
        })

    })

    it("must call any on_remove callbacks when an object is removed via game.remove", function(){
        var game = new Game(),
            x = false,
            obj1 = {on_remove: function(){ x = true}},
            obj2 = {}   // no on_remove to make sure it fails properly


        game.add(obj1)
        game.add(obj2)
        
        game.remove(obj1)
        game.remove(obj2)

        expect(x).toBeTruthy()
           
    })

    it("must call any object's on_remove handlers when all objects are removed via remove_all", function(){
        var game = new Game(),
            x = 0,
            obj1 = {on_remove: function(){ x += 1; console.log('yes'); }},
            obj2 = {},   // no on_remove to make sure it fails properly
            object_count = 10
    
        for ( var i = 0; i < object_count; i += 1 ) {
            game.add(obj1)
            game.add(obj2)
        }

        console.log(x)
        game.remove_all()
        
        expect(x).toEqual(object_count)
           
    })

})

})
