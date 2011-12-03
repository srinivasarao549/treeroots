define(["lib/compose"], function(compose){

    return compose({

        on_add: function(){
            var el = document.getElementsByClassName("speech_bubble")[0].cloneNode(true),
                main = document.getElementById("main_container")

            main.appendChild(el)
            el.style.display = "block"
            
            this.el = el
            this.main = main
        },
        on_remove: function(){
            this.main.removeChild(this.el);
        },
        set_text: function(name, text) {
            var text_el = this.el.getElementsByTagName("p")[0],
                name_el = this.el.getElementsByClassName("name")[0]

            text_el.innerHTML = text
            name_el.innerHTML = name
            
        }
    })

})
