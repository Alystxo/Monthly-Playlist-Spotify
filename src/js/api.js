var access_token = '';

//wait till dom is completly loaded before starting
window.addEventListener('DOMContentLoaded', (event) => {
    checkStatus();
});

function checkStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('code')) {
        getToken(urlParams.get('code'));
        var createForm = document.querySelector(".create-form");
        createForm.classList.remove("hidden");
        
    } else {
        var login = document.querySelector(".login");
        login.classList.remove("hidden");
    }
}

function getToken(code) {
  async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=authorization_code&code=' + code + '&redirect_uri=https%3A%2F%2Falystxo.github.io%2FMonthly-Playlist-Spotify%2F'
    });

    const data = await result.json();
    access_token = data.access_token;
  }
}

function getAllSongsTillDate() {
  async () => {

    const result = await fetch('https://api.spotify.com/v1/me/tracks&limit=50&offset=0', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + access_token}
    });

    const data = await result.json();
    return data;
  }
}

function createPlaylist(name) {
  async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=authorization_code&code=' + code + '&redirect_uri=https%3A%2F%2Falystxo.github.io%2FMonthly-Playlist-Spotify%2F'
    });

    const data = await result.json();
    return data.access_token;
  }
}

function addSongsToPlaylist(songs) {
  async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=authorization_code&code=' + code + '&redirect_uri=https%3A%2F%2Falystxo.github.io%2FMonthly-Playlist-Spotify%2F'
    });

    const data = await result.json();
    return data.access_token;
  }
}
