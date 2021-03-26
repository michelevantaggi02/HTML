"use strict";
let timer;
let contatore = -10;
let testo;

function carica(){
    timer = setInterval(muoviPallina, 10);
    testo =  'È la terza volta che ci provo, ma è difficile trovare le parole giuste, perché sento sempre che manchi qualcosa, qualcosa di profondo, qualcosa che ti faccia davvero apprezzare questo schifo che ho provato a fare con tutto me stesso. '+
    'Forse l\' unica cosa che davvero possa renderti felice in questo giorno per te speciale, è un "ti voglio bene" detto da quello stupido che ti stressa ogni giorno, perché sono stupido, e ti voglio bene per davvero. '+
    'Così sai che ci sono, perché se vuoi bene a una persona significa che ci saresti sempre per lei no? In fondo credo che sia così, infondo infondo so che anche se arrivassi ad odiarmi, io sarei lì presente per te, perché ti voglio bene.'+
    'E non mi stancherei mai di dirlo, perché non puoi non voler bene a una come te, che è presente in ogni momento e per ogni motivo, sei fantastica.'
    
    testo =  testo.split(" ");
    for(let i = 0; i<testo.length; i++){
        let parola = document.createElement("span");
        parola.innerText = testo[i] + " ";
        parola.setAttribute("id", ""+i);
        document.body.appendChild(parola);
    }
    let auguri = document.createElement("h1");
    auguri.innerText = "Buon Compleanno";
    document.body.appendChild(auguri);
    let firma = document.createElement("h2");
    firma.innerText = "-Michele";
    document.body.appendChild(firma); 
}
function muoviPallina(){
    let pallina = document.querySelectorAll(".pallina");
    for(let i = 0; i<pallina.length; i++){
        let posY = parseInt(pallina[i].style.top)+1;
        pallina[i].style.top = posY +"px";
        if(posY>=window.innerHeight){
            pallina[i].style.top = "-10px";
        }
    }
}
function esplosione(){
    contatore = -100;
    document.querySelector(".pallina").remove();
    for(let i = 0; i<testo.length; i++){
        let pallinaNuova = document.createElement("div");
        pallinaNuova.setAttribute("class", "pallina");
        let rand = Math.random() * window.innerWidth-(pallinaNuova.offsetWidth);
        let randY = Math.random()* window.innerHeight;
        pallinaNuova.style.left = rand +"px";
        pallinaNuova.style.top = (- randY) + "px";
        pallinaNuova.addEventListener("click", function(){
            pallinaNuova.remove()
            document.getElementById(""+i).setAttribute("class", "chiaro");
            if(document.querySelectorAll(".pallina").length == 0){
                document.querySelector("h1").setAttribute("class", "completato");
                document.querySelector("h2").setAttribute("class", "completato");
                for(let i = 1; i<=3; i++){
                    document.querySelector("#immagine"+i).style.display="inline";
                }
            }
        })
        pallinaNuova.style.transform = "rotate("+Math.random()*360 + "deg)";
        
        document.body.appendChild(pallinaNuova);
    }
    
    
}