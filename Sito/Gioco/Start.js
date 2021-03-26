var punteggio=0;
var load=function(){
    var shiny=document.getElementById("shiny").checked;
    var leggendario=document.getElementById("legge").checked;
    var evo1=document.getElementById("prima").selected;
    var evo2=document.getElementById("finale").selected;
    var uc=document.getElementById("uc").checked;
    var ban=document.getElementById("ban").checked;
    var lv=document.getElementById("lv").value;
    console.log(lv);
    if(ban==true){
        punteggio=punteggio-10;
    }
    else{
        if(shiny==true){
            punteggio=punteggio+250;
        }
        if(leggendario==true){
            punteggio=punteggio+120;
        }
        else{
        if(uc==true){
            punteggio=punteggio+100;
        }
        else{
        if(evo1==true){
            punteggio=punteggio+5;
        }
        if(evo2==true){
            punteggio=punteggio+10;
        }}
        if(lv != ""){
        punteggio=punteggio+parseInt(lv);}}
    }
    document.getElementById("lista").innerText=punteggio;

    document.getElementById("shiny").checked=false;
    document.getElementById("legge").checked=false;
    document.getElementById("prima").selected=false;
    document.getElementById("finale").selected=false;
    document.getElementById("uc").checked=false;
    document.getElementById("ban").checked=false;
    document.getElementById("lv").value=0;
}

var reset=function(){
    punteggio=0;
    document.getElementById("lista").innerText=punteggio;
    document.getElementById("shiny").checked=false;
    document.getElementById("legge").checked=false;
    document.getElementById("prima").selected=false;
    document.getElementById("finale").selected=false;
    document.getElementById("uc").checked=false;
    document.getElementById("ban").checked=false;
    document.getElementById("lv").value=0;
}