console.log("script2 has started!")

function insertPassword(input_password) {
    console.log("click event launched")
    let email = "";
    let password = "";
    chrome.storage.local.get(("email"), function (result) {
        console.log(result)
        if(result != null) {
            email = result;
        }
    });
    chrome.storage.local.get(("password"), function (result) {
        console.log(result)
        if(result != null) {
            password = result;
        }
    });
    window.setTimeout(function () {
        console.log(email)
        console.log(password.password)
        const request = new Request("https://password-manager-koda.amvera.io/rest/password", {

            method : "GET",
            headers : new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(email.email + ":" + password.password)
            })
        })
        console.log(request);
        fetch(request)
            .then(response => response.json())
            .then(json => {
                if(json !== null) {
                    console.log(json)
                    if (json.password != null) {
                        const value = json.password;
                        input_password.setAttribute("value", value)
                        input_password.value = value;
                        console.log("atr changed")
                    }
                }
            })

    }, 500)

}

function showIcons() {
    window.setTimeout(function (){
        const passwordField = document.querySelector('input[type="password"]');
        console.log(window.getComputedStyle(passwordField, null).display)
        if (passwordField != null && window.getComputedStyle(passwordField, null).display !== "none") {
            let a = document.createElement("a")
            let img = document.createElement("img")
            let div1 = document.createElement("div")
            let div2 = document.createElement("div")
            console.log(img);
            div2.style.backgroundImage = "url(" + chrome.runtime.getURL("/images/app.png") + ")"
            div2.style.backgroundRepeat = "no-repeat"
            div2.style.backgroundPosition = "right"
            div2.style.height = "40px";
            div2.style.width = "40px";
            div2.style.cursor = "pointer"
            passwordField.after(div2)
            div2.classList.add("my-unique-class")
            console.log("icon has shown!")

        }
        else {
            console.log("passwordField is null")
        }
    }, 2300)
}
let abc = 0;
try {
    chrome.storage.local.get(("isSignedIn"), function (result) {
        if(result.isSignedIn) {
            showIcons();
            window.addEventListener("click", function(e){
                console.log(abc)
                console.log(e)
                e.stopPropagation()
                const passwordField = document.querySelector('input[type="password"]');
                const element = document.getElementsByClassName('my-unique-class')
                if(e.target === element.item(0)){
                    insertPassword(passwordField)
                }
                abc += 1
            });
        }
    });

}
catch (err) {
    console.log(err.message);
}