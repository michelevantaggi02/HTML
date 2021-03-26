var angolo=
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

var frammento=[
    'precision mediump float;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '   gl_FragColor= vec4(fragColor, 1.0);',
    '}'
].join('\n');

var Quadrato = function(){
    var canvas=document.getElementById("Finestra");
    var gl=canvas.getContext('webgl');

    gl.clearColor(255.0,255.0,255.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    var Ombra=gl.createShader(gl.VERTEX_SHADER);
    var Frammento=gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(Ombra,angolo);
    gl.shaderSource(Frammento,frammento);

    gl.compileShader(Ombra);
    if(!gl.getShaderParameter(Ombra, gl.COMPILE_STATUS)){
        console.error('Errore compilazione Shader', gl.getShaderInfoLog(Ombra));//errore di compilazione
        return;
    }
    gl.compileShader(Frammento);
    if(!gl.getShaderParameter(Frammento, gl.COMPILE_STATUS)){
        console.error('Errore compilazione Frammento', gl.setShaderInfoLog(Frammento));//errore di compilazione
        return;
    }

    var quad=gl.createProgram();

    gl.attachShader(quad,Ombra);
    gl.attachShader(quad,Frammento);
    gl.linkProgram(quad);
    if(!gl.getProgramParameter(quad, gl.LINK_STATUS)){
        console.error('Errore collegamento del programma', gl.getProgramInfoLog(quad));
        return;
    }
    gl.validateProgram(quad);
    if(!gl.getProgramParameter(quad, gl.VALIDATE_STATUS)){
        console.error('ERRORE NELLA VALUTAZIONE DEL PROGRAMM',gl.getProgramInfoLog(quad));
        return;
    }
    //buffer
    var posVertici=[//x,y   r,g,b

        1.0,1.0,    1.0,0.0,0.0,
        1.0,-1.0,   1.0,0.0,0.0,
        -1.0,-1.0,   0.0,0.0,1.0,
        -1.0,1.0,   0.0,0.0,1.0
    ];

    var BufferQ=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,BufferQ);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(posVertici),gl.STATIC_DRAW);

    var Posizione=gl.getAttribLocation(quad,'vertPosition');
    var Colore=gl.getAttribLocation(quad,'vertColor');

    gl.vertexAttribPointer(
        Posizione,
        2,
        gl.FLOAT,
        gl.FALSE,
        5*Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        Colore,
        3,
        gl.FLOAT,
        gl.FALSE,
        5*Float32Array.BYTES_PER_ELEMENT,
        2*Float32Array.BYTES_PER_ELEMENT
    )

    gl.enableVertexAttribArray(Posizione);
    gl.enableVertexAttribArray(Colore);

    gl.useProgram(quad);
    gl.drawArrays(gl.TRIANGLES, 0, 4);
}