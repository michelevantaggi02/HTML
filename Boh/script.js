"use strict";
let palla = document.querySelector("#palla");
let indiceGamepad = -1;
let timerGamepad = null;
let posX = 0;
let posY = 0;
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

function controllaGamepad(){
    let gamepad = navigator.getGamepads()[indiceGamepad];
    posX += gamepad.axes[0];
    posY += gamepad.axes[1];
    console.log("asse x: "+gamepad.axes[0]);
    console.log("asse y: "+gamepad.axes[1]);
    palla.style.left = posX*2 + "px";
    palla.style.top = posY*2 + "px";
}