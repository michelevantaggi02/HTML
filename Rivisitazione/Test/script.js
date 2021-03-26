"use strict";
function aggiorna(){
    let data = new Date();
    
    let ore = Intl.DateTimeFormat('it', {hour : "2-digit"}).format(data);//data.getHours().toString().split("");
    let minuti = Intl.DateTimeFormat('it', {minute : "2-digit"}).format(data);//data.getMinutes().toString().split("");
    let secondi = Intl.DateTimeFormat('it',{second : "2-digit"}).format(data);//data.getSeconds().toString().split("");
    
    if(ore.length===1){
        ore = "0".concat(ore);
    }if (minuti.length === 1){
        minuti = "0".concat(minuti);
    }if(secondi.length === 1){
        secondi = "0".concat(secondi);
    }
    let totale = ore.concat(minuti.concat(secondi)).split("");
    
    
    let caselle = document.querySelectorAll("div.casella");
    for(let i = 0; i<caselle.length;i++){
        let testo = caselle[i].querySelector(".testo");
        if(testo.innerText !== totale[i]){
            cambia(caselle[i], totale[i]);
        }
    }
    let giorno = document.querySelector(".data");
    let stringaGiorno = new Intl.DateTimeFormat(navigator.language, {
        weekday : "short",
        day : "numeric",
        month : "long",
        year :"numeric"
    }).format(data);
    giorno.innerText = stringaGiorno;
}

function cambia(casella, testo){
    let vecchio = casella.querySelector("span.casella.successivo > .testo");
    let nuovo = casella.querySelector(".testo");
    let suc = casella.querySelector("span.casella.successivo");
    suc.style.transform = "rotateX(" + 0 + "deg) translate(-40%,-92.5%)";
    vecchio.innerText = nuovo.innerText;
    suc.style.display = "block";
    //vecchio.setAttribute("class","casella successivo gira");
    let rot = 0;
    let intervallo = setInterval(function(){
        
        nuovo.innerText = testo;
        suc.style.zIndex = 1;
        if(rot > 90){
            clearInterval(intervallo);
            suc.style.zIndex = -1;
            suc.style.display = "none";
        }
        suc.style.transform = "rotateX(" + rot + "deg) translate(-40%,-92.5%)";
        console.log(suc.style.transform);
        rot++;
    }, .005);
}
aggiorna();
setInterval(aggiorna, 1000);