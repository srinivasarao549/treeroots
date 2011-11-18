define(["core/objectManager", "core/mixin"], function(ObjectManager, mixin){

    describe("om", function(){
        
        describe("adding and removing objects from om.objects", function(){

            it("must store an object in om.objects, and return that object when adding", function(){
                var om = new ObjectManager(),
                    obj = om.add({x: 3})

                expect(om.objects.indexOf(obj) != -1).toBeTruthy()
            })
            
            it("must remove objects from om.objects on request", function(){
                var om = new ObjectManager(),
                    obj = om.add({x: 2}),
                    obj2 = om.add({x: 2})
                
                expect(om.objects.indexOf(obj) != -1).toBeTruthy()
                expect(om.objects.indexOf(obj2) != -1).toBeTruthy()

                om.remove(obj)            
                expect(om.objects.indexOf(obj) != -1).toBeFalsy()
                expect(om.objects.indexOf(obj2) != -1).toBeTruthy()
                
            })

            it("must not delete any extant objects if a non-om object is submitted to remove", function(){
                var om = new ObjectManager(),
                    obj = om.add({x: 2}),
                    obj2 = om.add({x: 2})
                
                expect(om.objects.indexOf(obj) != -1).toBeTruthy()
                expect(om.objects.indexOf(obj2) != -1).toBeTruthy()

                om.remove({x: 2})            
                expect(om.objects.indexOf(obj) != -1).toBeTruthy()
                expect(om.objects.indexOf(obj2) != -1).toBeTruthy()            
            })
            
            it("must allow removal of all objects", function(){
                var om = new ObjectManager(),
                    obj = om.add({x: 2}),
                    obj2 = om.add({x: 2})
                
                expect(om.objects.indexOf(obj) != -1).toBeTruthy()
                expect(om.objects.indexOf(obj2) != -1).toBeTruthy()

                om.remove_all()
                            
                expect(om.objects.indexOf(obj) != -1).toBeFalsy()
                expect(om.objects.indexOf(obj2) != -1).toBeFalsy()
                expect(om.objects.length).toEqual(0)
            })


        })

        describe("finding objects from om.object", function(){

            it("must be able to find objects by their constructor", function(){
                var om = new ObjectManager(),
                    C = function(){ this.x = 1}
                    
                om.add(new C)
                om.add(new C)
                om.add(new C)

                // try finding with the ctor
                var objs = om.find_instances(C)

                objs.forEach(function(o){
                    expect(o.x).toEqual(1)
                })

                expect(objs.length).toEqual(3)            
                
                // try something that's not it's ctor, but still in chain
                objs = om.find_instances(Object)
                expect(objs.length).toEqual(0)
            })

            it("must be able to find objects by their constructor with submitted array", function(){
                var om = new ObjectManager(),
                    C = function(){ this.x = 1},    
                    obj1 = om.add(new C),
                    obj2 = om.add(new C),
                    obj3 = om.add({x: 2})
                    
                        
                om.add(new C)

                // try finding with the ctor
                var objs = om.find_instances(C, [obj1, obj2, obj3])

                objs.forEach(function(o){
                    expect(o.x).toEqual(1)
                })

                expect(objs.length).toEqual(2)            
                
                // try something that's not it's ctor, but still in chain
                objs = om.find_instances(Object, [obj1, obj2, obj3])
                expect(objs.length).toEqual(1)
            })

            it("must be able to find objects by distance", function(){
                var om = new ObjectManager()
                
                om.add({x: 1, y: 2})
                om.add({x: 1.2, y: 3})
                om.add({x: 2, y: 2})
                
                
                var obj = om.find_nearest({x: 0, y: 0})
                
                expect(obj.x).toEqual(1)
                
            })
            
            it("must be able to find objects by distance with submitted array", function(){
                var om = new ObjectManager(),
                    obj1 = om.add({x: 1, y: 2}),
                    obj2 = om.add({x: 1.2, y: 3}),
                    obj3 = om.add({x: 2, y: 2})
                
                
                var obj = om.find_nearest({x: 0, y: 0}, [obj2, obj3])
                
                expect(obj).toEqual(obj3)
                
            })
            
            it("must be able to find objects by ID", function(){
                
                var om = new ObjectManager()
                
                om.add({x: 1, y: 2, id: "colbert"})
                om.add({x: 1, y: 3})
                om.add({x: 2, y: 2})
                
                var obj = om.find_by_id("colbert")
                
                expect(obj.x).toEqual(1)
            })
            
            it("must return undefined if no object with ID is found", function(){
                
                var om = new ObjectManager()
                
                om.add({x: 1, y: 2, id: "colbert"})
                om.add({x: 1, y: 3})
                om.add({x: 2, y: 2})
                
                var obj = om.find_by_id("colberta")
                
                expect(obj).toEqual(undefined)
            })

            it("must return objects by ID with submitted array", function(){
                var om = new ObjectManager()
                
                om.add({x: 1, y: 2, id: "colbert"})
                om.add({x: 1, y: 3})
                om.add({x: 2, y: 2})
                
                var obj = om.find_by_id("colbert")
                
                expect(obj.x).toEqual(1)
            })
            
            // QUESTIONS:
            
            // * What should happen if there's more than one objects with an ID?
            // * Should duplicate ids be allowed in
        })

    })


    describe("mixin", function(){
        
        it("must copy across all properties", function(){
            var pos = {x: 2, x: 3},
                draw = {draw: function(context, camera) {
                    console.log('yes')
                }},
                
                obj = mixin(pos, draw, {})
                                
            expect(obj.x).toEqual(pos.x)
            expect(obj.y).toEqual(pos.y)
            expect(obj.draw).toEqual(draw.draw)
                
        })
        
        it("must inherit from objects to the right preferencially", function(){
            var pos = {x: 2, y: 3},
                pos2 = {x: 4, y: 4, z: 20}
                
                obj = mixin(pos2, pos, {})
                
                expect(obj.x).toEqual(pos.x)
                expect(obj.y).toEqual(pos.y)
                expect(obj.z).toEqual(pos2.z)
            
        })
    })
            
})
