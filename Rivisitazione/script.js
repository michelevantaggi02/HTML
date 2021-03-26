function cerca(){
    let testo = document.getElementById("cerca").value;
    let motore = document.getElementById("motore").value;
    let scheda = document.getElementById("nuova").checked ? "_blank": "_self";
    if(testo!=null || testo != ""){
        testo.replace(" ", "+");
        window.open(motore+testo, scheda);
    }
}
function tasto(evento){
    if(evento.key == "Enter")
        cerca();
    
}

function sfondoRandom(){
    let oggetto = document.querySelector(".sfondi img");
    console.log(oggetto);
    oggetto.src = "Sfondi/Immagini/"+listaSfondi[Math.floor(Math.random() * (listaSfondi.length-1))];
}