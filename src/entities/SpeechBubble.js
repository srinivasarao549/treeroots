define(["lib/compose"], function(compose){

    return compose({
        create_bubble: function(){
            var el = document.getElementsByClassName("speech_bubble")[0].cloneNode(true),
                main = document.getElementById("main_container")

            main.appendChild(el)
            this.el = el
            return el
        },
        set_text: function(name, text) {

            var el = this.el || this.create_bubble(),
                text_el = el.getElementsByTagName("p")[0],
                name_el = el.getElementsByClassName("name")[0]

            text_el.innerHTML = text
            name_el.innerHTML = name
            
        },
        show: function(){
            this.el.style.display = "block"
        },
        hide: function(){
            this.el.style.display = "none"
        }
    })

})
