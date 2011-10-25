describe("Game (adding and removing objects)", function(){
    
    it("should return an id on adding an object, and retrieve the object with that", function(){
        var game = new Game(),
            objref = game.add({x: 3}),
            obj = game.retrieve(objref)
        
        expect(obj.x).toEqual(3)
    })
    
    it("should be able to retrieve an object using itself", function(){
        var game = new Game(),
            obj = {x: 3},
            retrieved
            
        game.add(obj)
        retrieved = game.retrieve(obj)
        
        expect(retrieved).toEqual(obj)
    })
    
    it("should be able to remove an object using itself", function(){
        var game = new Game(),
            obj = {x: 3},
            retrieved
            
        game.add(obj)
        game.remove(obj)
        retrieved = game.retrieve(obj)
        
        expect(retrieved).toEqual(undefined)
        
    })
    
    it("should be able to remove an object using itself", function(){
        var game = new Game(),
            objref = game.add({x: 3}),  
            obj
        game.remove(objref)
            
        obj = game.retrieve(objref)
        
        expect(obj).toEqual(undefined)
        
    })
    
    it("should be able to remove all objects", function(){
        var game = new Game(),
            obj = {x: 2},
            obj2 = {x: 4}
        
        game.add(obj)
        game.add(obj2)
        
        game.remove_all()
        
        expect(game.retrieve(obj2)).toEqual(undefined)
    })
})