const button = document.getElementById("submit-button")

button.addEventListener("click", function (event) {
    chrome.storage.local.set({isSignedIn: false}).then(() => {
        console.log("Value " + false + " is set to storage")
    });
    console.log("verify script started")
    const email = document.querySelector("input[type='text']")
    const password = document.querySelector("input[type='password']")
    const request = new Request("https://password-manager-koda.amvera.io/rest/verify", {
        method : "GET",
        headers : new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email.value + ":" + password.value)
        })

    })

        verifyUser(request, email, password)
})
function verifyUser(request, email, password) {

    console.log(request);
    console.log(2)
    let json;
    let response
    try {
        response = fetch(request).then(response => {
            console.log(response)
            let status = response.status
            console.log(status)
            console.log(3)

            if(status != 401) {
                response.json().then(json => {
                    console.log(json)
                    let hasErrors = json.hasErrors
                    console.log(hasErrors)
                    if(hasErrors.toString().localeCompare("false") === 0) {
                        if(document.querySelector("p") != null) {
                            document.querySelector("p").textContent = json["message"]
                            console.log(111)
                        }
                        chrome.storage.local.set({username: json["username"]}).then(() => {
                            console.log("Value " + json["username"] + " is set to storage")
                        });
                        chrome.storage.local.set({isSignedIn: true}).then(() => {
                            console.log("Value " + true + " is set to storage")
                        });
                        chrome.storage.local.set({email: email.value}).then(() => {
                            console.log("User email is set to storage")
                        });
                        chrome.storage.local.set({password: password.value}).then(() => {
                            console.log("User password is set to storage")
                        });
                    }
                    else {
                        if (document.querySelector("p") == null) {
                            const p = document.createElement("p");
                            p.textContent = json["message"]
                            document.querySelectorAll("label").item(2).after(p)
                            p.style.color = "red"
                        } else {
                            document.querySelector("p").textContent = json["message"];
                        }
                        document.querySelector("p").style.color = "red"
                    }
                    chrome.storage.local.get(("isSignedIn"), function (result) {
                        console.log("isSignedIn? - " + result.isSignedIn)
                        if(result.isSignedIn) {
                            chrome.action.setPopup({popup: "popup_signedIn.html"})
                            window.location.href="popup_signedIn.html";

                            console.log("popup changed!")
                        }
                    });
                })

            }
            else{
                if(document.querySelector("p") != null) {
                    const p = document.querySelector("p");
                    p.textContent = "Неправильный логин или пароль"
                }
                else{
                    const p = document.createElement("p");
                    p.textContent = "Неправильный логин или пароль"
                    document.querySelectorAll("label").item(2).after(p)
                }
            }

        }).catch(error => console.log(error))

    }
    catch (e) {
        console.log(e)
    }

}