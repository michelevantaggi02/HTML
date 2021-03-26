function getText(){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', '/ARI/ari.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                document.getElementById("versione").innerHTML="Versione corrente: "+request.responseText;
                return request.responseText;
            }
        }
    }
}

var versione = getText();
document.getElementById("versione").innerHTML="Versione corrente: "+versione;