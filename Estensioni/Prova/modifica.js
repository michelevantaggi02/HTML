let aspetta = 1;
let comparsa = 2;
let item = null;
async function esegui() {

    while (document.querySelector(".d7iDfe") !== null) {
        await new Promise((r) => setTimeout(r, 500));
    }

    console.log("ho aspettato");
    
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.greeting === "informazioni") {
                sendResponse({
                    farewell: "risposta",
                });
                console.log(request);
                trasforma(request);
            } else if (request.greeting === "muta_microfono") {
                console.log("Muto il microfono");
                console.log(item);
                item.children[1].children[0].children[0].children[0].children[0].click();
                sendResponse({
                    farewell: "ho mutato il microfono"
                });
            }
        });
    setTimeout(function () {
        if (localStorage.getItem("valori") !== null) {
            trasforma(JSON.parse(localStorage.getItem("valori")));
        }
        item = document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6");
        console.log(item);
    }, 1000);
}
esegui();
function trasforma(valori) {
    setTimeout(function () {
        let effetti = document.querySelector(".optic-menu");
        if (effetti !== null) {
            effetti.style.display = valori.effetti;
        }
    }, 2000);
    if (valori.microfono === "true") {
        document.body.onblur = checkblur;
        console.log("modificato blur " + document.body.onblur);
    } else {
        document.body.onblur = null;
    }
    aspetta = parseInt(valori.attesa);
    comparsa = parseInt(valori.comparsa);
    console.log("Nuovo valore di aspetta: " + aspetta);
    localStorage.setItem("valori", JSON.stringify(valori));
}

function checkblur(e) {
    setTimeout(function () {
        if (document.querySelector(".YhIwSc").innerText !== "Stai presentando" && document.querySelector(".U26fgb.JRY2Pb.mUbCce.kpROve.uJNmj.A00RE.M9Bg4d.FTMc0c.N2RpBe.jY9Dbb") === null) {
            chrome.runtime.sendMessage(
                {
                    greeting: "notifica",
                    messaggio: "Hai lasciato il microfono acceso!"
                },
                function (response) {
                    console.log(response.farewell);

                });
        }

        setTimeout(function () {
            chrome.runtime.sendMessage(
                {
                    greeting: "cancella_notifica"
                },
                function (response) {
                    console.log(response.farewell);

                });
        }, comparsa * 1000)
    }, aspetta * 1000);

}