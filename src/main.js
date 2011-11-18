require(['entities', 'core/objectManager'], function(entities, ObjectManager){
    
    
    var canvas = document.getElementById("treeroots")
    
    var om = new ObjectManager(canvas)

    om.add(new entities.Cursor())
    console.log(om)
    om.draw(canvas, canvas.getContext('2d'))
    
})

