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
        
    })
    
})