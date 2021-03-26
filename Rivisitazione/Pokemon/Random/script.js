"use strict";
let MAX = 894;
let random=Math.floor((Math.random() * MAX) + 1);
let pokemon= function(){
    random=Math.floor((Math.random() * MAX) + 1);
    console.log(random);
    console.log(typeof random);
    let out=random.toString();
    if(random<10){
        out="00"+random;
    }
    else if(random<100){
        out="0"+random;
    }
    let img="https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+out+".png";
    document.getElementById("pk").src=img;
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