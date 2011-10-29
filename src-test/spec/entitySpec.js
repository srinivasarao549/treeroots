describe("entity", function(){
    
    describe("mixin", function(){
        
        it("must copy across all properties", function(){
            var pos = {x: 2, x: 3},
                draw = {draw: function(context, camera) {
                    console.log('yes')
                }},
                
                obj = entity.mixin({}, pos, draw)
                                
            expect(obj.x).toEqual(pos.x)
            expect(obj.y).toEqual(pos.y)
            expect(obj.draw).toEqual(draw.draw)
                
        })
        
        it("must inherit from objects to the left preferencially", function(){
            var pos = {x: 2, y: 3},
                pos2 = {x: 4, y: 4, z: 20}
                
                obj = entity.mixin({}, pos, pos2)
                
                expect(obj.x).toEqual(pos.x)
                expect(obj.y).toEqual(pos.y)
                expect(obj.z).toEqual(pos2.z)
            
        })
    })
    
})