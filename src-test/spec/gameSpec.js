describe("Game (object management)", function(){
    
    describe("adding and removing objects from game.objects", function(){

        it("must store an object in game.objects, and return that object when adding", function(){
            var game = new Game(),
                obj = game.add({x: 3})

            expect(game.objects.indexOf(obj) != -1).toBeTruthy()
        })
        
        it("must remove objects from game.objects on request", function(){
            var game = new Game(),
                obj = game.add({x: 2}),
                obj2 = game.add({x: 2})
            
            expect(game.objects.indexOf(obj) != -1).toBeTruthy()
            expect(game.objects.indexOf(obj2) != -1).toBeTruthy()

            game.remove(obj)            
            expect(game.objects.indexOf(obj) != -1).toBeFalsy()
            expect(game.objects.indexOf(obj2) != -1).toBeTruthy()
            
        })

        it("must not delete any extant objects if a non-game object is submitted to remove", function(){
            var game = new Game(),
                obj = game.add({x: 2}),
                obj2 = game.add({x: 2})
            
            expect(game.objects.indexOf(obj) != -1).toBeTruthy()
            expect(game.objects.indexOf(obj2) != -1).toBeTruthy()

            game.remove({x: 2})            
            expect(game.objects.indexOf(obj) != -1).toBeTruthy()
            expect(game.objects.indexOf(obj2) != -1).toBeTruthy()            
        })
        
        it("must allow removal of all objects", function(){
            var game = new Game(),
                obj = game.add({x: 2}),
                obj2 = game.add({x: 2})
            
            expect(game.objects.indexOf(obj) != -1).toBeTruthy()
            expect(game.objects.indexOf(obj2) != -1).toBeTruthy()

            game.remove_all()
                        
            expect(game.objects.indexOf(obj) != -1).toBeFalsy()
            expect(game.objects.indexOf(obj2) != -1).toBeFalsy()
            expect(game.objects.length).toEqual(0)
        })


    })

    describe("finding objects from game.object", function(){

        it("must be able to find objects by their constructor", function(){
            var game = new Game(),
                C = function(){ this.x = 1}
                
            game.add(new C)
            game.add(new C)
            game.add(new C)

            // try finding with the ctor
            var objs = game.find_instances(C)

            objs.forEach(function(o){
                expect(o.x).toEqual(1)
            })

            expect(objs.length).toEqual(3)            
            
            // try something that's not it's ctor, but still in chain
            objs = game.find_instances(Object)
            expect(objs.length).toEqual(0)
        })

        it("must be able to find objects by their constructor with submitted array", function(){
            var game = new Game(),
                C = function(){ this.x = 1},    
                obj1 = game.add(new C),
                obj2 = game.add(new C),
                obj3 = game.add({x: 2})
                
                    
            game.add(new C)

            // try finding with the ctor
            var objs = game.find_instances(C, [obj1, obj2, obj3])

            objs.forEach(function(o){
                expect(o.x).toEqual(1)
            })

            expect(objs.length).toEqual(2)            
            
            // try something that's not it's ctor, but still in chain
            objs = game.find_instances(Object, [obj1, obj2, obj3])
            expect(objs.length).toEqual(1)
        })

        it("must be able to find objects by distance", function(){
            var game = new Game()
            
            game.add({x: 1, y: 2})
            game.add({x: 1.2, y: 3})
            game.add({x: 2, y: 2})
            
            
            var obj = game.find_nearest({x: 0, y: 0})
            
            expect(obj.x).toEqual(1)
            
        })
        
        it("must be able to find objects by distance with submitted array", function(){
            var game = new Game(),
                obj1 = game.add({x: 1, y: 2}),
                obj2 = game.add({x: 1.2, y: 3}),
                obj3 = game.add({x: 2, y: 2})
            
            
            var obj = game.find_nearest({x: 0, y: 0}, [obj2, obj3])
            
            expect(obj).toEqual(obj3)
            
        })
        
        it("must be able to find objects by ID", function(){
            
            var game = new Game()
            
            game.add({x: 1, y: 2, id: "colbert"})
            game.add({x: 1, y: 3})
            game.add({x: 2, y: 2})
            
            var obj = game.find_by_id("colbert")
            
            expect(obj.x).toEqual(1)
        })
        
        it("must return undefined if no object with ID is found", function(){
            
            var game = new Game()
            
            game.add({x: 1, y: 2, id: "colbert"})
            game.add({x: 1, y: 3})
            game.add({x: 2, y: 2})
            
            var obj = game.find_by_id("colberta")
            
            expect(obj).toEqual(undefined)
        })

        it("must return objects by ID with submitted array", function(){
            var game = new Game()
            
            game.add({x: 1, y: 2, id: "colbert"})
            game.add({x: 1, y: 3})
            game.add({x: 2, y: 2})
            
            var obj = game.find_by_id("colbert")
            
            expect(obj.x).toEqual(1)
        })
        
        // QUESTIONS:
        
        // * What should happen if there's more than one objects with an ID?
        // * Should duplicate ids be allowed in
    })

})


describe("Game (Process Methds)", function(){
    
    describe("drawing", function(){
        
        it("must always sort by the object's 'z' property on draw", function(){
            var game = new Game(),
                out_of_order = false,
                last_z = 0
            
            for ( var i = 0; i < 100; i += 1){
                game.add({z: Math.random()})
            }
            
            game.draw({width: 0, height: 0}, {clearRect: function(){}})

            game.objects.forEach(function(a){
                if ( last_z > a.z ) out_of_order = true
            })

            expect(out_of_order).toBeFalsy()
        })
        
        it("must call all objects' draw functions, if they have one", function(){
            var count = 0,
                objects_with_draw = 0,
                Obj = function(){ 
                        this.draw = function(){
                            count += 1
                        }
                    }
            
                for ( var i = 0; i < 100; i += 1){
                    var obj_to_add
                    
                    if ( Math.random() > 0.5 ) {
                        objects_with_draw += 1
                        game.add(new Obj)
                    } else {
                        game.add({})
                    }
                }
            
                game.draw({width: 0, height: 0}, {clearRect: function(){}})
                
                expect(objects_with_draw).toEqual(count)
            
        })
        
    })
    
})