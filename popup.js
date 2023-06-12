chrome.storage.local.get(("username"), function (result) {
    if(result.username != null) {
        document.querySelector("h2").textContent = "Вы успешно вошли " + result.username
        document.querySelector("h3").textContent = "Теперь вы можете автозаполнить пароли на определенных сайтах," +
            " к которым вы прописали url в менеджере паролей"
    }
});
