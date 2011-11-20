define(["level"], function(Level){

describe("level", function(){

    describe("loading objects", function(){ 
        it("must create entities and add them to the submitted game", function(){
            var entities = {Cursor: function(){this.x = 2;},
                            Player: function(){this.y = 4;}
                            },
                game = {objects: [],
                        add: function(object){ this.objects.push(object)}
                        },
                level = new Level(game, entities),
                json = '[{"type": "Cursor"}, {"type": "Player"}]'

                level.load(json)
                
                expect(game.objects).toContain(new entities.Cursor)
                expect(game.objects).toContain(new entities.Player)
        })

        it("must mixin any non-type parameters to the object", function(){
     
            var entities = {Cursor: function(){ this.x = 2}},
                game = {objects: [],
                        add: function(object){ this.objects.push(object)}
                        },
                level = new Level(game, entities),
                json = '[{"type": "Cursor", "y": 4}]'

                level.load(json)
                
                expect(game.objects[0]).toEqual({x: 2, y: 4})

        })

    })

    describe("loading images and objects mixed", function(){

   })
})

})
