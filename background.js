
chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({isSignedIn: false}).then(() => {
        console.log("Value " + false + " is set to storage")
    });
    console.log("Installed!")
});




chrome.action.onClicked.addListener(async (tab) => {
        chrome.storage.local.get(("isSignedIn"), function (result) {
                        if(result.isSignedIn) {
                            window.location.href="popup_signedIn.html";
                        }
                    });
    });

/*chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    console.log(console.log("script1 has started!"))
    if(changeInfo.status == 'complete') {
        try {
            console.log(console.log("try to execute script2"))
            chrome.scripting
                .executeScript({
                    target : {tabId : tabId},
                    func : addIconToPasswordField(),
                })

        } catch (err) {
            console.log("error -> " + err.message + " extension cannot run on the chrome:// page ")
        }
    }
})

 */
