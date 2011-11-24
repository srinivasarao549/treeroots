define(["lib/compose"], function(compose){

    return compose({
        current_time: 0,
        paused: true,
        timeout: 0,
        check: function(td, callback){
            if ( this.paused ) 

            this.current_time -= td

            if ( this.current_time <= 0 ) {
                callback(true)
                this.current_time = this.timeout // loop
            } else {
                callback(false)
            }
        },
        set: function(timeout){
            this.timeout = timeout
            this.current_time = timeout
        },
        pause: function(){
            this.paused = true
        },
        unpause: function(){
            this.paused = false
        }
    })

})
