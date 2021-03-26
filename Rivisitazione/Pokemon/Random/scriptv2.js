"use strict";
var myUrl = 'https://www.pokemon.com/it/api/pokedex';
//  But if you make it from a browser, then it will work without problem ...

// However to make it work, we are going to use the cors-anywhere free service to bypass this
var proxy = 'https://cors-anywhere.herokuapp.com/';

let dati = [];
$.ajax({
    url: proxy + myUrl,
    complete:function(data){
        dati = data.responseJSON;
        MAX = dati[dati.length-1].id;
        console.log(data);
        document.getElementById("loading").style.display = "none";
        document.getElementById("main").style.display = "block";
        pokemon();
    },
    error: function(){
        console.log("errore");
    }
});

let MAX = 0;
let random=Math.floor((Math.random() * MAX) + 1);

let trova = function(id){
    let i;
    for(i=0; i<dati.length; i++){
        if(dati[i].id == id){
            console.log("Controllo id: "+i);
            return dati[i];
        }
    }
    console.log("nessun id corrisponde");
    return dati[0];
}

let pokemon= function(){
    MAX = dati[dati.length-1].id;
    random=Math.floor((Math.random() * MAX) + 1);
    console.log(random);
    console.log(typeof random);
    
    let item = trova(random);
    
    let tipi = document.querySelectorAll("li a a");
    for(let i = 0; i<tipi.length; i++){
        tipi[i].remove();
    }

    document.getElementById("pk").src=item.ThumbnailImage;
    document.getElementById("nome").innerText = item.name;
    document.getElementById("nome").href = "https://www.pokemon.com"+item.detailPageURL;
    document.getElementById("numero").innerText = item.id;
    let tipo = document.getElementById("tipo");
    for(let i = 0; i<item.type.length; i++){
        let a = document.createElement("a");
        a.innerText = item.type[i];
        a.setAttribute("class", item.type[i]);
        tipo.appendChild(a);
    }
    let deb = document.getElementById("deb");
    for(let i = 0; i<item.weakness.length; i++){
        let a = document.createElement("a");
        a.innerText = item.weakness[i];
        a.setAttribute("class", item.weakness[i]);
        deb.appendChild(a);
    }
    cambiaSfondo();
}
function cambiaSfondo(){
    if(random<=151)
        document.body.setAttribute("class", "gen1");
    else if(random<=251)
        document.body.setAttribute("class", "gen2");
    else if(random<=386)
        document.body.setAttribute("class", "gen3");
    else if(random<=493)
        document.body.setAttribute("class", "gen4");
    else if(random<=649)
        document.body.setAttribute("class", "gen5");
    else if(random<=721)
        document.body.setAttribute("class", "gen6");
    else if(random<=809)
        document.body.setAttribute("class", "gen7");
    else if(random<=894)
        document.body.setAttribute("class", "gen8");
}