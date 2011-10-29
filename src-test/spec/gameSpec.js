describe("Game (object management)", function(){
    
    describe("adding and removing objects", function(){
        
        it("must return an id on adding an object, and retrieve the object with that", function(){
            var game = new Game(),
                obj = game.add({x: 3})

            expect(obj.x).toEqual(3)
        })
        
    })

    describe("finding objects from all objects", function(){
        
        it("must be able to find objects by 'type'", function(){
            var game = new Game(),
                C = function(){ this.x = 1}
                
            game.add(new C)
            game.add(new C)
            game.add(new C)
            
            var objs = game.find("C")

            objs.forEach(function(o){
                expect(o.x).toEqual(1)
            })

        })
        
        
        it("must be able to find objects by distance", function(){
            var game = new Game()
            
            game.add({x: 1, y: 2})
            game.add({x: 1.2, y: 3})
            game.add({x: 2, y: 2})
            
            
            var obj = game.find_nearest({x: 0, y: 0})
            
            expect(obj.x).toEqual(1)
            
        })

        it("must be able to find objects by ID", function(){
            
            var game = new Game()
            
            game.add({x: 1, y: 2, id: "colbert"})
            game.add({x: 1, y: 3})
            game.add({x: 2, y: 2})
            
            var obj = game.find_by_id("colbert")
            
            expect(obj.x).toEqual(1)
        })
    })


    describe("shadowing", function(){
        
        
        
    })

})