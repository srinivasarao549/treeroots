
!function(){

    traits.moveByAngle = entity.mixin({
        velocity: 100,
        angle: 0,
        
        moveByAngle: function(td){
            var velocity = this.velocity / td,
                angle = this.angle
        
            this.x += Math.cos(angle) * velocity
            this.y += Math.sin(angle) * velocity
        
            return velocity
        }
    }, traits.position)


}()