var access_token = '',
    expires_in = '';
    sessionStart = Date.now(),
    requestHeader = new Headers();

//wait till dom is completly loaded before starting
window.addEventListener('DOMContentLoaded', (event) => {
    checkStatus();
});

function checkStatus() {
  if(getHashValue('access_token')) {
    access_token = getHashValue('access_token');
    requestHeader.append("Authorization", "Bearer " + access_token);
    expires_in = getHashValue('expires_in');
    var createForm = document.querySelector(".create-form");
    createForm.classList.remove("hidden");
  } else {
      var login = document.querySelector(".login");
      login.classList.remove("hidden");
  }
}

function getLibrary() {
  var requestOptions = {
    method: 'GET',
    headers: requestHeader,
    redirect: 'follow'
  };

  var results = [];
      results['items'] = [];

  var fetchNow = function(url) {
    fetch(url, requestOptions).then(function(result) {
      const data = result.json();
      results['items'].append(data.items);
      if(data.next) {
        fetchNow(data.next);
      }
    });
  }

  fetchNow('https://api.spotify.com/v1/me/tracks?limit=50');
  
  return results;
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

function getHashValue(key) {
  var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
  return matches ? matches[1] : null;
}
