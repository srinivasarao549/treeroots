describe("Game (object management)", function(){
    
    describe("adding and removing objects", function(){
        
        it("must return an id on adding an object, and retrieve the object with that", function(){
            var game = new Game(),
                objref = game.add({x: 3}),
                obj = game.retrieve(objref)

            expect(obj.x).toEqual(3)
        })

        it("must be able to retrieve an object using itself", function(){
            var game = new Game(),
                obj = {x: 3},
                retrieved

            game.add(obj)
            retrieved = game.retrieve(obj)

            expect(retrieved).toEqual(obj)
        })

        it("must be able to remove an object using itself", function(){
            var game = new Game(),
                obj = {x: 3},
                retrieved

            game.add(obj)
            game.remove(obj)
            retrieved = game.retrieve(obj)

            expect(retrieved).toEqual(undefined)

        })

        it("must be able to remove an object using itself", function(){
            var game = new Game(),
                objref = game.add({x: 3}),  
                obj
            game.remove(objref)

            obj = game.retrieve(objref)

            expect(obj).toEqual(undefined)

        })

        it("must be able to remove all objects", function(){
            var game = new Game(),
                obj = {x: 2},
                obj2 = {x: 4}

            game.add(obj)
            game.add(obj2)

            game.remove_all()

            expect(game.retrieve(obj2)).toEqual(undefined)
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