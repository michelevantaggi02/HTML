"use strict";

const CONTATORE_MAX = 30;
const VELOCITA = 5;
const FRAME_SALTO = 6;

let blocchi = [];
let campioni = [];
let personaggio;
let piano;
let contatoreSalto;
let destra = false;
let sinistra = false;
let timerPrincipale;
let timerSalto = null;
let timerNemici;
let timerGamepad;
let timerGameOver;
let indiceGamepad = -1;
let posizioneSfondo = 0;
let punti = 0;
let indiceMovimento = 0;
let rotazione = 0;
let dimensione = 1.0;

/**
 * Funzione chiamata al caricamento del gioco, serve a caricare gli sprite e a resettare la scena iniziale
 */
function carica() {
    blocchi = [];
    punti = 0;
    indiceMovimento = 0;
    rotazione = 0;
    dimensione = 1.0;
    document.getElementById("punteggio").innerText = "0";
    document.getElementById("gioco").style.display = "block";
    document.getElementById("menu").style.display = "none";
    personaggio = document.getElementById("personaggio");
    personaggio.style.backgroundImage = 'url("immagini/sprite_mario.png")';
    personaggio.style.transform = "scale(1)";
    personaggio.style.left = "0";
    personaggio.style.bottom = "50px"
    //il timer si occupa di aggiornare automaticamente il movimento dei personaggi
    timerPrincipale = setInterval(aggiornaMovimento, 10);
    timerNemici = setInterval(aggiornaMovimentoNemici, 10);
    piano = document.getElementById("piano");
    piano.style.left = "0";
    console.log("Dimensioni schermo: " + window.innerWidth);
    //nuovoBlocchetto();
    window.addEventListener("keydown", tastoGiu);
    window.addEventListener("keyup", tastoSu);
    window.addEventListener("gamepadconnected", function (e) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index, e.gamepad.id,
            e.gamepad.buttons.length, e.gamepad.axes.length);
        indiceGamepad = e.gamepad.index;
        timerGamepad = setInterval(controllaGamepad, 10);
    });
    window.addEventListener("gamepaddisconnected", function (e) {
        clearInterval(timerGamepad);
        timerGamepad = null;
        indiceGamepad = -1;
    });

    if(indiceGamepad != -1){
        timerGamepad = setInterval(controllaGamepad, 10);
    }
    document.getElementById("canzone").currentTime = 0;
    document.getElementById("canzone").play();
    generaTerreno();
    caricaCampioni();
}

function caricaCampioni(){
    campioni = [];
    let max = Number(localStorage.getItem("i"));
    for(let i = 0; i<max; i++){
        let campione = {'nome': localStorage.getItem(i+".nome"), 'punti': localStorage.getItem(i+".punti")};
        campioni.push(campione);
    }
}

function generaTerreno() {
    nuovoBlocchetto("blocchetto", 300, 50);
    nuovoBlocchetto("blocchetto", 350, 100);
    nuovoBlocchetto("blocchetto", 350, 50);
    nuovoBlocchetto("nemico", 500, 50);
    nuovoBlocchetto("blocchetto", 750 , 50);
    nuovoBlocchetto("blocchetto", 750 , 100);
    nuovoBlocchetto("blocchetto", 800 , 50);
    nuovoBlocchetto("blocchetto", 1050 , 200);
    nuovoBlocchetto("blocchetto", 1100 , 200);
    nuovoBlocchetto("bloccoRandom", 1100 , 400);
    nuovoBlocchetto("blocchetto", 1150 , 200);
    nuovoBlocchetto("nemico", 1000 , 50);
    nuovoBlocchetto("blocchetto", 1350 , 50);
    nuovoBlocchetto("blocchetto", 1350 , 100);
    nuovoBlocchetto("blocchetto", 1350 , 150);
    nuovoBlocchetto("blocchetto", 1400 , 50);
    nuovoBlocchetto("blocchetto", 1400 , 100);
    nuovoBlocchetto("blocchetto", 1450 , 50);
    nuovoBlocchetto("nemico", 1650 , 50);
    nuovoBlocchetto("nemico", 1750 , 50);
    for(let i = 1; i<7; i++){
        for(let j = 1; j<=i; j++){
        nuovoBlocchetto("blocchetto", 2150+(50*i) , 50*j);
        }
    }
    nuovoBlocchetto("bandiera", 2800 , 50);
    nuovoBlocchetto("castello", 3000 , 50);

}

function controllaGamepad() {
    let gamepad = navigator.getGamepads()[indiceGamepad];

    if (collisioneBasso() && (gamepad.buttons[12].pressed || gamepad.buttons[0].pressed)) {
        console.log("salto");
        avviaTimerSalto();
    }
    destra = gamepad.buttons[15].pressed;
    sinistra = gamepad.buttons[14].pressed;

}

function aggiornaMovimentoNemici() {
    for (let i = 0; i < blocchi.length; i++) {
        if (blocchi[i].getAttribute("class") == "nemico") {
            if (parseInt(blocchi[i].style.left) < -50) {
                blocchi[i].remove();
            } else {
                let direzione = Number(blocchi[i].getAttribute("direzione"));
                //console.log(blocchetto.style.left);
                if (!collisioneNemico(blocchi[i])) {
                    blocchi[i].style.left = parseFloat(blocchi[i].style.left) + (VELOCITA * direzione / 3) + "px";
                } else {
                    direzione = -direzione;
                    blocchi[i].setAttribute("direzione", "" + direzione);
                    blocchi[i].style.left = parseFloat(blocchi[i].style.left) + (VELOCITA * direzione / 3) + "px";
                }
            }
        }
    }
}

function collisioneNemico(nemico) {
    //punto in basso a sinistra
    let nemicoX = parseInt(nemico.style.left);
    let nemicoY = parseInt(nemico.style.bottom);
    //punto in alto a destra
    let nemicoX2 = nemicoX + nemico.clientWidth;
    let nemicoY2 = nemicoY + nemico.clientHeight;
    let risultato = true;
    for (let i = 0; i < blocchi.length; i++) {
        if (blocchi[i] != nemico) {
                //punto in basso a sinistra
                let blocchettoX = parseInt(blocchi[i].style.left);
                let blocchettoY = parseInt(blocchi[i].style.bottom);
                //punto in alto a destra
                let blocchettoX2 = blocchettoX + blocchi[i].clientWidth;
                let blocchettoY2 = blocchettoY + blocchi[i].clientHeight;
                if(blocchettoX>nemicoX2 || blocchettoX2<nemicoX)
                    risultato = false;
                else if(blocchettoY > nemicoY2 || nemicoY > blocchettoY2)
                    risultato = false;
                else return true;
        }
    }
    return risultato;
}

/**
 * Genera un blocco fuori dalla schermata
 */
function nuovoBlocchetto(tipo, posX, posY) {
    let blocchetto1 = document.createElement("div");
    blocchetto1.setAttribute("class", tipo);
    blocchetto1.style.bottom = posY + "px";
    blocchetto1.style.left = posX + "px";
    document.getElementById("gioco").appendChild(blocchetto1);
    if (tipo == "nemico") {
        //sono un genio del male, lo so
        blocchetto1.setAttribute("direzione", "-1");
    }
    blocchi.push(blocchetto1);
}

/**
 * funzione che controlla quando un tasto viene premuto
 * @param evento del tasto premuto
 */
function tastoGiu(evento) {
    if (evento.key == "d" || event.key == "ArrowRight") {
        destra = true;
        sinistra = false;
    } else if (evento.key == "a" || event.key == "ArrowLeft") {
        sinistra = true;
        destra = false;
    } else if (collisioneBasso() && (evento.key == " " || event.key == "w" || event.key == "ArrowUp")) {
        avviaTimerSalto();
    }
}

/**
 * Funzione che controlla quando il tasto premuto precedentemente viene rilasciato
 * @param evento 
 */

function tastoSu(evento) {
    if (evento.key == "d" || event.key == "ArrowRight") {
        destra = false;
    } else if (evento.key == "a" || event.key == "ArrowLeft") {
        sinistra = false;
    }
}


/**
 * Aggiorna automaticamente il movimento del personaggio impedendo l'input-lag
 */
function aggiornaMovimento() {
    let posX = parseInt(personaggio.style.left);
    if((destra || sinistra)&&timerSalto == null&&collisioneBasso()){
        personaggio.style.backgroundImage = 'url("immagini/movimentoMario.png")';
        personaggio.style.backgroundPositionX = indiceMovimento*50+"px";
        indiceMovimento = (indiceMovimento+1)%3;
    }else if(timerSalto == null){
        personaggio.style.backgroundImage = 'url("immagini/sprite_mario.png")';
        personaggio.style.backgroundPositionX = "0";
    }

    if (destra && !collisioneAvanti()) {
        personaggio.style.transform = "scale(1, 1)";
        if (posX + VELOCITA + 80 < window.innerWidth / 2) {
            personaggio.style.left = posX + VELOCITA + "px";
        } else {
            piano.style.left = parseInt(piano.style.left) - (VELOCITA / 1.2) + "px";
            posizioneSfondo = posizioneSfondo - (VELOCITA / 5);
            //console.log("Posizione sfondo:"+posizioneSfondo);
            document.body.style.backgroundPositionX = posizioneSfondo + "px";
            //console.log("Piano: "+piano.style.left);
            if (Math.abs(parseInt(piano.style.left)) >= window.innerWidth) {
                piano.style.left = "0";
            }
            for (let i = 0; i < blocchi.length; i++) {
                blocchi[i].style.left = parseInt(blocchi[i].style.left) - (VELOCITA / 1.4) + "px";
            }
            //aggiornaMovimentoNemici();
        }


    } else if (!collisioneDietro() && sinistra) {
        personaggio.style.left = posX - VELOCITA + "px";
        personaggio.style.transform = "scale(-1, 1)";
    }
    if (timerSalto == null && !collisioneBasso()) {//timerSalto== null && parseInt(personaggio.style.bottom)>40){
        personaggio.style.bottom = parseInt(personaggio.style.bottom) - FRAME_SALTO + "px";
    }

}

/**
 * Timer che si occupa dell'animazione di salto del personaggio
 */

function aggiornaSalto() {
    if (!collisioneSopra() && contatoreSalto > 0) {
        personaggio.style.bottom = parseInt(personaggio.style.bottom) + FRAME_SALTO + "px";
    } else {
        personaggio.style.backgroundImage = 'url("immagini/sprite_mario.png")';
        clearInterval(timerSalto);
        timerSalto = null;
    }
    contatoreSalto--;
}
/**
 * Funzione richiamata quando si preme lo spazio per avviare il salto
 */
function avviaTimerSalto() {

    if (timerSalto == null) {
        effettoSonoro("audio/smb_jump-super.wav");
        contatoreSalto = CONTATORE_MAX;
        console.log("AVVIO IL TIMER");
        timerSalto = setInterval(aggiornaSalto, 10);
        personaggio.style.backgroundImage = 'url("immagini/sprite_mario_salto.png")';
    }

}

/**
 * Riproduce un suono quando data la posizione
 * @param {sorgente del suono} sorgente 
 */
function effettoSonoro(sorgente) {
    let oggettoSorgente = document.getElementById("sorgenteEffetto");
    let suono = document.getElementById("effettoSonoro");
    oggettoSorgente.src=sorgente;
    suono.load()
    suono.play();
}

/**
 * controlla se c'è una collisione sotto al personaggio
 */
function collisioneBasso() {
    //punto in basso a sinistra
    let personaggioX = parseInt(personaggio.style.left);
    let personaggioY = parseInt(personaggio.style.bottom) - FRAME_SALTO;
    //punto in basso a destra
    let personaggioX2 = personaggioX + personaggio.clientWidth;
    let personaggioY2 = personaggioY + personaggio.clientHeight;
    let risultato = true;
    for (let i = 0; i < blocchi.length; i++) {
        //punto in alto a sinistra
        let blocchettoX = parseInt(blocchi[i].style.left);
        let blocchettoY = parseInt(blocchi[i].style.bottom) + blocchi[i].clientHeight;
        //punto in basso a destra
        let blocchettoX2 = blocchettoX + blocchi[i].clientWidth;
        let blocchettoY2 = blocchettoY - blocchi[i].clientHeight;

        if (personaggioY <= 50-FRAME_SALTO)
            return true;

        else if (personaggioX > blocchettoX2 || blocchettoX > personaggioX2)
            risultato = false;
        else if (blocchettoY < personaggioY || blocchettoY > personaggioY2)
            risultato = false;

        else if (blocchi[i].getAttribute("class") == "nemico") {
            rimuoviCattivo(blocchi[i], i);
            break;
        }else if(blocchi[i].getAttribute("class")=="bandiera"){
            animazioneBandiera();
            return true;
        } else {
            risultato = true;
            break;
        }

    }
    return risultato;
}

/**
 * Controlla se c'è una collisione a destra del personaggio
 */
function collisioneAvanti() {
    //punto in basso a sinistra
    let personaggioX = parseInt(personaggio.style.left)+VELOCITA;
    let personaggioY = parseInt(personaggio.style.bottom);
    //punto in basso a destra
    let personaggioX2 = personaggioX + personaggio.clientWidth;
    let personaggioY2 = personaggioY + personaggio.clientHeight;
    let risultato = false;
    for (let i = 0; i < blocchi.length; i++) {
        //punto in alto a sinistra
        let blocchettoX = parseInt(blocchi[i].style.left);
        let blocchettoY = parseInt(blocchi[i].style.bottom) + blocchi[i].clientHeight;
        let blocchettoY2 = parseInt(blocchi[i].style.bottom);


        if (personaggioX > blocchettoX || blocchettoX > personaggioX2 || personaggioY >= blocchettoY || personaggioY2 < blocchettoY2)
            risultato = false;
        else if (blocchi[i].getAttribute("class") == "nemico") {
            morte();
            return true;
        }else if (blocchi[i].getAttribute("class") == "bandiera") {
            animazioneBandiera();
            return true;
        } else {
            risultato = true;
            break;
        }
    }
    return risultato;
}

/**
 * controlla se c'è una collisione a sinistra del personaggio
 */
function collisioneDietro() {
    //punto in basso a sinistra
    let personaggioX = parseInt(personaggio.style.left) - VELOCITA;
    let personaggioY = parseInt(personaggio.style.bottom);
    //punto in basso a destra
    let personaggioY2 = personaggioY + personaggio.clientHeight;
    let personaggioX2 = personaggioX + personaggio.clientWidth;
    let risultato = true;
    for (let i = 0; i < blocchi.length; i++) {
        //punto in alto a destra
        let blocchettoX = parseInt(blocchi[i].style.left) + blocchi[i].clientWidth;
        let blocchettoY = parseInt(blocchi[i].style.bottom) ; 
        let blocchettoY2 = blocchettoY + blocchi[i].clientHeight;

        if (personaggioX > 0 && (personaggioX > blocchettoX || blocchettoX > personaggioX2 || personaggioY >= blocchettoY2 || personaggioY2 < blocchettoY))
            risultato = false;
        else if (blocchi[i].getAttribute("class") == "nemico") {
            morte();
            return true;
        }else if (blocchi[i].getAttribute("class") == "bandiera") {
            animazioneBandiera();
            return true;
        }
        else {
            return true;
        }
    }
    return risultato;
}

/**
 * Controlla se il personaggio collide sopra un blocchetto
 */
function collisioneSopra() {
    //punto in alto a sinistra
    let personaggioX = parseInt(personaggio.style.left);
    let personaggioY = parseInt(personaggio.style.bottom)+FRAME_SALTO;
    //punto in alto a destra
    let personaggioX2 = personaggioX + personaggio.clientWidth;
    let personaggioY2 = personaggioY + personaggio.clientHeight;

    let risultato = true;
    for (let i = 0; i < blocchi.length; i++) {
        //punto in basso a sinistra
        let blocchettoX = parseInt(blocchi[i].style.left);
        let blocchettoY = parseInt(blocchi[i].style.bottom);
        //punto in basso a destra
        let blocchettoX2 = blocchettoX + blocchi[i].clientWidth;

        if (personaggioX > blocchettoX2 || blocchettoX > personaggioX2)
            risultato = false;
        else if (blocchettoY > personaggioY2 || blocchettoY < personaggioY)
            risultato = false;
        else if(blocchi[i].getAttribute("class") == "bloccoRandom"){
            blocchi[i].setAttribute("class", "blocchetto");
            daiMoneta();
        }else {
            return true;
            break;
        }
    }
}

/**
 * Aggiunge il punteggio e mostra una piccola icona sul personaggio
 */
function daiPunteggio(p) {
    let punteggio = document.getElementById("punteggio");
    punti += p;
    punteggio.innerText = punti;
    let icona = document.createElement("p");
    icona.setAttribute("id", "iconaPunteggio");
    icona.innerText = p;
    icona.style.left = personaggio.style.left;
    icona.style.bottom = personaggio.style.bottom;//parseInt(personaggio.style.bottom)+105+"px";
    document.getElementById("gioco").appendChild(icona);
    setTimeout(function () { icona.remove(); }, 1000);
}
/**
 * Da 1000 punti al giocatore
 */
function daiMoneta(){
    daiPunteggio(1000);
    effettoSonoro("audio/smb_coin.wav");
}

/**
 * Funzione che rimuove il nemico quando acciaccato
 */
function rimuoviCattivo(nemico, indice) {
    daiPunteggio(100);
    blocchi.splice(indice, 1);
    nemico.style.left = "-100px";
    nemico.remove();
    effettoSonoro("audio/smb_stomp.wav");
}

function morte(){
    effettoSonoro("audio/smb_mariodie.wav");
    rotazione = 0;
    timerGameOver = setInterval(animazioneMorte, 10);
    fineGioco(3000);
}
/**
 * Funzione chiamata per fermare il gioco
 */
function fineGioco(tempoGameOver) {
    clearInterval(timerNemici);
    clearInterval(timerPrincipale);
    clearInterval(timerSalto);
    timerPrincipale = null;
    timerNemici = null;
    timerSalto = null;
    document.getElementById("canzone").pause();
    window.removeEventListener("keydown", tastoGiu);
    window.removeEventListener("keyup", tastoSu);
    if (indiceGamepad != -1) {
        clearInterval(timerGamepad);
    }
    setTimeout(gameOver, tempoGameOver);
    if (indiceGamepad != -1) {
        navigator.getGamepads()[indiceGamepad].vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: 1000,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0
        });
    }

}


/**
 * Animazione che fa roteare il personaggio fuori lo schermo
 */
function animazioneMorte() {
    rotazione += 10;
    personaggio.style.transform = "rotate(" + rotazione + "deg)";
    personaggio.style.bottom = parseInt(personaggio.style.bottom) - 10 + "px";
    if (rotazione >= 2880) {
        clearInterval(timerGameOver);
    }
}

/**
 * Mostra la schermata finale del gioco
 */
function gameOver() {
    for (let i = 0; i < blocchi.length; i++) {
        blocchi[i].remove();
    }
    effettoSonoro("audio/smb_gameover.wav");
    document.getElementById("gioco").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    destra = sinistra = false;
    document.getElementById("punteggioFinale").innerText = "Punteggio: " + punti;
    let listaCampioni = document.getElementById("listaCampioni");
    listaCampioni.innerHTML = "";
    for (let i = 0; i < campioni.length; i++) {
        let elemento = document.createElement("li");
        elemento.innerText = campioni[i].nome + ": " + campioni[i].punti;
        listaCampioni.appendChild(elemento);
    }
    
}

/**
 * Riporta al menu principale
 */
function restart() {
    let nomeCampione = document.getElementById("nome").value;
    let campione = { 'nome': nomeCampione, 'punti': punti };
    campioni.push(campione);
    campioni = campioni.sort(sortCampioni);
    while(campioni.length>10){
        campioni.pop();
    }
    localStorage.setItem("i", campioni.length)
    for(let i = 0; i<campioni.length; i++){
        localStorage.setItem(i+".nome", campioni[i].nome);
        localStorage.setItem(i+".punti", campioni[i].punti);
    }
    document.getElementById("menu").style.display = "block";
    document.getElementById("gameOver").style.display = "none";
}

/**
 * funzione che esegue il sort del vettore di oggetti con i campioni
 */
function sortCampioni(a, b) {
    return b.punti - a.punti;
}
function animazioneBandiera(){
    effettoSonoro("audio/smb_flagpole.wav");
    setTimeout(function(){
        effettoSonoro("audio/smb_world_clear.wav");
        
    }, 2000)
    fineGioco(10000)
    let bandiera = document.querySelector(".bandiera");
    personaggio.style.left = bandiera.style.left;
    daiPunteggio(parseInt(personaggio.style.bottom));
    timerGameOver = setInterval(scendiBandiera, 10);
}

function scendiBandiera(){
    let bandiera = document.querySelector(".bandiera");
    if(bandiera!=null && parseInt(bandiera.style.bottom)<parseInt(personaggio.style.bottom)){
        personaggio.style.bottom = parseInt(personaggio.style.bottom)-FRAME_SALTO+"px";
    }else{
        
        clearInterval(timerGameOver);
        timerGameOver = setInterval(vaiAlCastello, 10);

    }
}

function vaiAlCastello(){
    let castello = document.querySelector(".castello");
    let posCastello = parseInt(castello.style.left);
    let posX = parseInt(personaggio.style.left);
    if(posX<posCastello+castello.clientWidth/2-personaggio.clientWidth/2){
        personaggio.style.left = posX+VELOCITA+"px";
    }else if(dimensione>0){
        dimensione-=0.010;
        personaggio.style.transform = "scale("+dimensione.toFixed(1)+")";
        
    }else{
        clearInterval(timerGameOver);
        timerGameOver = null;
    }
}