require(['../src/core/behaviours', '../src/core/mixin'], function(behaviours, mixin){

    describe("graphics", function(){
        
        describe("color", function(){
        
            it("must set default values of r=0, g=0, b=0 and a=1", function(){
                var obj = mixin(behaviours.color, {})
                        
                expect(obj.color_r).toEqual(0)
                expect(obj.color_g).toEqual(0)
                expect(obj.color_b).toEqual(0)
                expect(obj.color_a).toEqual(1)
            
            })
        
            it("must return a string representing the color in the rgba(r, g, b, a) format", function(){
            
                var obj = mixin(behaviours.color, {
                    color_r: 0,
                    color_g: 50,
                    color_b: 100,
                    color_a: 1
                    }),
                expected_string = "rgba(0,50,100,1)",
                actual_string = obj.color_string()
            
                expect(actual_string).toEqual(expected_string)
            
            })
        })

        describe("fill_rect", function(){
        
            it("must make the default draw method draw rect using obj's own x, y, width, height", function(){
                var obj = mixin(behaviours.fill_rect, {
                    x: 0, y: 10, height: 20, width: 10
                }),
                mock_context = {
                    fillRect: function(x, y, width, height) {
                        this.x = x
                        this.y = y
                        this.width = width
                        this.height = height
                    }
                }
            
                obj.draw(mock_context)
            
            
                expect(mock_context.x).toEqual(obj.x)
                expect(mock_context.y).toEqual(obj.y)
                expect(mock_context.height).toEqual(obj.height)
                expect(mock_context.width).toEqual(obj.width)
            
            })
        
            it("must apply offsets when drawing (passed as second param)", function(){
                var obj = mixin(behaviours.fill_rect, {
                    x: 0, y: 10, height: 20, width: 10
                }),
                mock_context = {
                    fillRect: function(x, y, width, height) {
                        this.x = x
                        this.y = y
                        this.width = width
                        this.height = height
                    }
                }
            
                obj.draw(mock_context, {x: 10, y: 10})
            
                expect(mock_context.x).toEqual(obj.x + 10)
                expect(mock_context.y).toEqual(obj.y + 10)
                expect(mock_context.height).toEqual(obj.height)
                expect(mock_context.width).toEqual(obj.width)
            })

            it("have a custom method for drawing", function(){
                var obj = mixin(behaviours.fill_rect, {
                    x: 0, y: 10, height: 20, width: 10
                    }),
                    mock_context = {
                        fillRect: function(x, y, width, height) {
                            this.x = x
                            this.y = y
                            this.width = width
                            this.height = height
                        },
                        set fillStyle(input){
                            if ( input !== undefined ) this.color = input
                        }
                    },
                    color = "color_string"
            
                obj.draw_fill_rect(mock_context, 0, 0, 10, 20, color)
            
                expect(mock_context.x).toEqual(0)
                expect(mock_context.y).toEqual(0)
                expect(mock_context.width).toEqual(10)
                expect(mock_context.height).toEqual(20)
                expect(mock_context.color).toEqual(color)
            
            })
        })

        describe("image", function(){
        
            it("must call drawImage with the short style by default", function(){
                var obj = mixin(behaviours.image, {
                    image: {height: 10, width: 10}
                    }),
                    mock_context = {
                        drawImage: function(image, x, y, width, height){
                            this.image = image
                            this.x = x
                            this.y = y
                            this.width = width
                            this.height = height
                        }
                    }
            
                obj.draw(mock_context)
            
                expect(mock_context.x).toEqual(obj.x)
                expect(mock_context.y).toEqual(obj.y)
                expect(mock_context.width).toEqual(obj.image.width)
                expect(mock_context.height).toEqual(obj.image.height)
                expect(mock_context.image).toEqual(obj.image)
            
            })
        
            it("must apply offsets when drawing (passed as second param)", function(){
                var obj = mixin(behaviours.image, {
                    image: {height: 10, width: 10}
                    }),
                    mock_context = {
                        drawImage: function(image, x, y, width, height){
                            this.image = image
                            this.x = x
                            this.y = y
                            this.width = width
                            this.height = height
                        }
                    },
                    offset = {x: 10, y: 20}
            
                obj.draw(mock_context, offset)
            
                expect(mock_context.x).toEqual(obj.x + offset.x)
                expect(mock_context.y).toEqual(obj.y + offset.y)
                expect(mock_context.width).toEqual(obj.image.width)
                expect(mock_context.height).toEqual(obj.image.height)
                expect(mock_context.image).toEqual(obj.image)
        
        
            })
        
            it("must re-order drawImage arguments if a sufficient number are submitted", function(){
                var obj = mixin(behaviours.image, {}),
                    mock_context = {
                        drawImage: function(image, clip_x, clip_y, clip_width, clip_height, x, y, width, height){
                            this.image = image
                            this.x = x
                            this.y = y
                            this.width = width
                            this.height = height
                            this.clip_x = clip_x
                            this.clip_y = clip_y
                            this.clip_width = clip_width
                            this.clip_height = clip_height
                        }
                    },
                    p = {
                        image: 0,
                        clip_x: 1,
                        clip_y: 2, 
                        clip_width: 3,
                        clip_height: 4,
                        x: 5,
                        y: 6, 
                        height: 7, 
                        width: 8
                    }
            
                obj.image(mock_context, p.image, p.x, p.y, p.width, p.height, p.clip_x, p.clip_y, p.clip_width, p.clip_height)
        
                for ( var prop in p ){
                    expect(mock_context[prop]).toEqual(p[prop])
                }
            })
            
        })
    })


})
    
