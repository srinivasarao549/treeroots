//  contains main game logic

!function(context){
    
    var treeroots = {
        init: function(canvas){
            this.canvas = canvas
            this.context = canvas.getContext("2d")
            
            console.log(this)
        }
        
    }
    
    
    
    
    
    context["treeroots"] = treeroots
}(this)