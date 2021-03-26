var ShaderAngolo=
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'fragColor=vertColor;',
'   gl_Position=vec4(vertPosition,0.0,1.0);',
'}'
].join('\n');

var FrammentoShader=[
    'precision mediump float;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '   gl_FragColor= vec4(fragColor, 1.0);',
    '}'
].join('\n');

var IniTriangolo = function(){
    console.log("La funzione funziona:D");

    var canvas= document.getElementById("Finestra");
    var gl=canvas.getContext('webgl');

    if(!gl){//cambia versione di WebGL nel caso non è supportata
        console.log("WebGL non supportato, ritorno alla versione sperimentale");
        gl= canvas.getContext('experimental-webgl');
    }
    if(!gl){
        alert("WebGL non supportato");
    }
    
    /*canvas.width= window.innerWidth;
    canvas.height=window.innerHeight;
    gl.viewport(0,0,canvas.width,canvas.height);*/
    //Ridimensiona il canvas a seconda della finestra

    gl.clearColor(0.9,0.8,0.8,1.0);//colore dello sfondo del canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);//possono entrare in collisione

    //crea le shaders(colori)
    var Shader= gl.createShader(gl.VERTEX_SHADER);
    var Frammento= gl.createShader(gl.FRAGMENT_SHADER);

    //compilatore:
    //seleziona il percorso
    gl.shaderSource(Shader, ShaderAngolo);
    gl.shaderSource(Frammento, FrammentoShader);
    //compila
    gl.compileShader(Shader);
    if(!gl.getShaderParameter(Shader, gl.COMPILE_STATUS)){
        console.error('Errore compilazione Shader', gl.getShaderInfoLog(Shader));//errore di compilazione
        return;
    }
    gl.compileShader(Frammento);
    if(!gl.getShaderParameter(Frammento, gl.COMPILE_STATUS)){
        console.error('Errore compilazione Frammento', gl.setShaderInfoLog(Frammento));//errore di compilazione
        return;
    }
    
    var triangolo= gl.createProgram(); //crea il programma WebGL
    gl.attachShader(triangolo,Shader);//collega lo shader al programma
    gl.attachShader(triangolo,Frammento);//collega il frammento al programma
    gl.linkProgram(triangolo);
    if(!gl.getProgramParameter(triangolo, gl.LINK_STATUS)){
        console.error('Errore collegamento del programma', gl.getProgramInfoLog(triangolo));
        return;
    }
    gl.validateProgram(triangolo);
    if(!gl.getProgramParameter(triangolo, gl.VALIDATE_STATUS)){
        console.error('ERRORE NELLA VALUTAZIONE DEL PROGRAMM',gl.getProgramInfoLog(triangolo));
        return;
    }

    //crea il buffer(?)
    var vertici=[//x,y      R,G,B
        0.0,0.5,        1.0,0.0,0.0,
        -0.5,-0.5,      0.0,0.0,1.0,
        0.5,-0.5,        0.0,1.0,0.0
    ];

    var BufferTriangolo= gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, BufferTriangolo);//collega il buffer alla sua variabile
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertici),gl.STATIC_DRAW);
    //1. tipo di buffer 2.WebGL richiede dati a 32 bit 3.Manda la richiesta solo una volta

    var posizioneLocazione= gl.getAttribLocation(triangolo, 'vertPosition');
    var coloreLocazione= gl.getAttribLocation(triangolo, 'vertColor');
    //nome viene preso dalla funzione scritta in c per la creazione del vertice
    gl.vertexAttribPointer(
        posizioneLocazione,//locazione
        2,//numero di elementi per attributo(sempre prima funzione)
        gl.FLOAT,//tipo
        gl.FALSE,//dato normalizzato
        5*Float32Array.BYTES_PER_ELEMENT,//dimensioni vertice singolo
        0//offset dall'inizio di un vertice singolo

    );
    gl.vertexAttribPointer(
        coloreLocazione,//locazione
        3,//numero di elementi per attributo(sempre prima funzione)
        gl.FLOAT,//tipo
        gl.FALSE,//dato normalizzato
        5*Float32Array.BYTES_PER_ELEMENT,//dimensioni vertice singolo
        2*Float32Array.BYTES_PER_ELEMENT//offset dall'inizio di un vertice singolo

    );

    gl.enableVertexAttribArray(posizioneLocazione);//abilita l'attributo
    gl.enableVertexAttribArray(coloreLocazione);//abilita l'attributo

    //render loop principale
    gl.useProgram(triangolo);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    //1.disegna un triangolo 2. numero di vertici da skippare 3.numero di vertici da disegnare

};