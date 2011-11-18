require(['entities', 'game'], function(entities, Game){
    
    
    var canvas = document.getElementById("treeroots")
    var om = new Game(canvas)
    om.add(new entities.Cursor())
    om.draw(canvas, canvas.getContext("2d"))

})
