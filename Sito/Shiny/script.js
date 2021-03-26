var aggiorna=function(){
    var soscount=0;
    var count=0;
    var raro=4096;
var sos= document.getElementById("sos").selected;
var masuda= document.getElementById("masuda").selected;
var charm=document.getElementById("charm").checked;
console.log("charm:",charm);
console.log("sos:",sos);
console.log("masuda:",masuda);
    if(charm==true){
        raro=1356;
        console.log("charmcount:",raro);
    }
    if(sos==true){
        if(charm==true&& count>=70&&count<=255){
            raro=683;
            console.log("sosrarocharm:",raro);
        }
        else{if(count>=70&&count<=255){
            raro=1024;
            console.log("sosraro:",raro);
        }
        else{
            if(count>255||count<70){
                if(charm==true){
                    raro=1356;
                    console.log("charmcount:",raro);
                }
                else{
                raro=4096;
                soscount=0;
                console.log("sosraronocount:",raro);
            }}
        }
        }
    }
    else{
        if(masuda==true){
            if(charm==true){
                raro=512;
                console.log("masuda:",raro);
            }
            else{
                raro=683;
                console.log("masuda:",raro);
            }
        }
    }
    var val="1/"+raro;
    document.getElementById("prob").innerHTML=val;
}

