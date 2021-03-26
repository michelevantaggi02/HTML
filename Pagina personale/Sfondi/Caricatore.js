var files = ["MW1","Pokemon","Smash"]

files.forEach(function(file) {
    file = "Sfondo"+file
    var fileSrc = 'Sfondi/'+file+'.png'
    var div = document.createElement("div");
    var a = document.createElement("a", {href: 'file'+'.png'});
    a.href = fileSrc;
    a.download = fileSrc;
    var img = document.createElement("img");
    img.src = fileSrc;
    a.appendChild(img)
    div.appendChild(a);
    var base = document.getElementById("base");
    document.body.insertBefore(div,base);

});

