
function generaImmagini(){
    for(let i = 0; i<listaSfondi.length;i++){
        let span = document.createElement("span");
        span.setAttribute("class","sfondo");
        span.style.backgroundImage="url('Immagini/"+listaSfondi[i]+"');";
        let immagine = document.createElement("img");
        immagine.src = "Immagini/"+listaSfondi[i];
        let ancora = document.createElement("a");
        ancora.href = "Immagini/"+listaSfondi[i];
        ancora.download= "Immagini/"+listaSfondi[i];
        ancora.innerText= "Scarica";
        span.appendChild(immagine);
        span.appendChild(ancora);

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false ) {
            let visualizza = document.createElement("a");
        visualizza.innerText = "Visualizza";
        visualizza.addEventListener("click", function(e){
            let vis = document.getElementById("visualizzatore");
            vis.style.display = "block";
            let img = document.getElementById("imgvis");
            img.src = "Immagini/"+listaSfondi[i];
            
        span.appendChild(visualizza);
            
        })
        }
        
        
        document.body.appendChild(span);
    }
}