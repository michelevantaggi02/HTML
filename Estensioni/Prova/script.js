chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
          {
            // That fires when a page's URL contains a 'g' ...
            conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'meet.google.com' },
              })
            ],
            // And shows the extension's page action.
            actions: [ 
              new chrome.declarativeContent.ShowPageAction()]
          }
        ]);
      });
  });

  let n_notifiche = 0;
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting === "notifica") {
            sendResponse({
                farewell: "notifica ricevuta"
            });
            var opt = {
              type: 'basic',
              title: 'Attenzione',
          message: request.messaggio,
        iconUrl:"icon.png",
      buttons:[{
        title:"Chiudi microfono"
      }]
    };
          chrome.notifications.create("avvertimento "+n_notifiche, opt);
          chrome.notifications.onButtonClicked.addListener(
            function(id, index){
              chrome.tabs.query({url: "https://meet.google.com/*-*-*"}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id,
                {
                    greeting: "muta_microfono"
                },
                function (response) {
                    console.log(response.farewell);

                })
              });
            }
          );

          n_notifiche++;
        }else if(request.greeting === "cancella_notifica"){
          sendResponse({
            farewell:"notifica cancellata"
          });
          for(let i = 0; i<n_notifiche; i++)
            chrome.notifications.clear("avvertimento "+i);
          
          n_notifiche = 0;
        }
    });