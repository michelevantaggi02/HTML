/*var genera = function(){
    var min=document.getElementById("min").value;
    var max=document.getElementById("max").value;
    var rand=Math.floor((Math.random() * parseInt(max)) + parseInt(min));
    document.getElementById("risultato").innerHTML=rand;
}*/

var pokemon= function(){
    var random=Math.floor((Math.random() * 806) + 1);
    console.log(random);
    console.log(typeof random);
    var out=random.toString();
    if(random<10){
        out="00"+random;
    }
    else if(random<100){
        out="0"+random;
    }
    var prev = document.getElementById("pk").src;
    document.getElementById("prev").src=prev;
    var img="https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+out+".png";
    document.getElementById("pk").src=img;
    document.getElementById("numero").innerHTML="Pok&#233;mon n."+out;
}