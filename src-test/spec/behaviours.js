define(['behaviours', 'core/mixin'], function(b, mixin){
 
   describe("graphics", function(){
        
        describe("color", function(){
        
            it("must set default values of r=0, g=0, b=0 and a=1", function(){
                var obj = mixin(b.color, {})
                        
                expect(obj.color_r).toEqual(0)
                expect(obj.color_g).toEqual(0)
                expect(obj.color_b).toEqual(0)
                expect(obj.color_a).toEqual(1)
            
            })
        
            it("must return a string representing the color in the rgba(r, g, b, a) format", function(){
            
                var obj = mixin(b.color, {
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
                var obj = mixin(b.fill_rect, {
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
            
                obj.draw(undefined, mock_context)
            
                expect(mock_context.x).toEqual(obj.x)
                expect(mock_context.y).toEqual(obj.y)
                expect(mock_context.height).toEqual(obj.height)
                expect(mock_context.width).toEqual(obj.width)
            
            })
        
            it("must apply offsets when drawing (passed as second param)", function(){
                var obj = mixin(b.fill_rect, {
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
            
                obj.draw({x: 10, y: 10}, mock_context)
            
                expect(mock_context.x).toEqual(obj.x + 10)
                expect(mock_context.y).toEqual(obj.y + 10)
                expect(mock_context.height).toEqual(obj.height)
                expect(mock_context.width).toEqual(obj.width)
            })

            it("have a custom method for drawing", function(){
                var obj = mixin(b.fill_rect, {
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
                var obj = mixin(b.image, {
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
            
                obj.draw(undefined, mock_context)
            
                expect(mock_context.x).toEqual(obj.x)
                expect(mock_context.y).toEqual(obj.y)
                expect(mock_context.width).toEqual(obj.image.width)
                expect(mock_context.height).toEqual(obj.image.height)
                expect(mock_context.image).toEqual(obj.image)
            
            })
        
            it("must apply offsets when drawing (passed as second param)", function(){
                var obj = mixin(b.image, {
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
            
                obj.draw(offset, mock_context)
            
                expect(mock_context.x).toEqual(obj.x + offset.x)
                expect(mock_context.y).toEqual(obj.y + offset.y)
                expect(mock_context.width).toEqual(obj.image.width)
                expect(mock_context.height).toEqual(obj.image.height)
                expect(mock_context.image).toEqual(obj.image)
        
            })
 
       })

    })

})
    
