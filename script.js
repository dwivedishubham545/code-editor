let viewer = document.querySelector("#viewer")

let alltext = document.querySelectorAll(".code_container textarea")
let html, css, javascript = ""

alltext.forEach((e, index) => {
    e.addEventListener("keyup" , () =>{
        if(index == 0){
            html = e.value
          
        }
        if(index == 1){
            css = e.value
        }
        if(index == 2){
            javascript = e.value
        }

         viewer.contentDocument.body.innerHTML = html
         viewer.contentDocument.head.innerHTML = `<style>${css}</style>`
         viewer.contentWindow.eval(javascript)
    })
})

