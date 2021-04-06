//wait till dom is completly loaded before starting
window.addEventListener('DOMContentLoaded', (event) => {
    checkStatus();
});

function checkStatus() {
    if(getCookie('oauth-token')) {
        var createForm = document.querySelector(".create-form");
        createForm.classList.remove("hidden");
        
    } else {
        var login = document.querySelector(".login");
        login.classList.remove("hidden");
    }
}

function createPlaylist (name) {
  
}

function addSongsToPlaylist(songs) {
  
}
