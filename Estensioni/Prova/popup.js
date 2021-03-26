let checkEffetti = document.querySelector("#effetti");
let checkMicrofono = document.querySelector("#microfono");
let inputAttesa = document.querySelector("#tempo");
let inputComparsa = document.querySelector("#comparsa");
function informa(e) {

    /*chrome.runtime.sendMessage(
        {
            greeting: "informazioni",
            effetti: checkEffetti.checked ? "block" : "none"
        },
        function (response) {
            console.log(response.farewell);

        });*/
        localStorage.setItem("attesa", inputAttesa.value);
        localStorage.setItem("microfono", checkMicrofono.checked);
        localStorage.setItem("effetti", checkEffetti.checked);
        localStorage.setItem("comparsa", inputComparsa.value);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            greeting: "informazioni",
            effetti: checkEffetti.checked ? "block" : "none",
            microfono:checkMicrofono.checked ? "true": "false",
            attesa: ""+inputAttesa.value,
            comparsa:""+inputComparsa.value
        },
            function (response) {
                console.log(response.farewell);
            });
    });
    
}
document.querySelector("#imposta").onclick = informa;

checkEffetti.checked = localStorage.getItem("effetti") === "true";
checkMicrofono.checked = localStorage.getItem("microfono") === "true";
inputAttesa.value = localStorage.getItem("attesa");
inputComparsa.value = localStorage.getItem("comparsa");

checkMicrofono.onclick = function(e){
    inputAttesa.disabled = inputComparsa.disabled = !checkMicrofono.checked;
}