var access_token = '',
    requestHeader = new Headers(),
    getOptions = {
      method: 'GET',
      headers: requestHeader,
      redirect: 'follow'
    },
    userID = '',
    userLibrary = [];

//wait till dom is completly loaded before starting
window.addEventListener('DOMContentLoaded', (event) => {
    checkStatus();
});

function checkStatus() {
  if(getHashValue('access_token')) {
    access_token = getHashValue('access_token');
    requestHeader.append("Authorization", "Bearer " + access_token);
    //directly catch the library and user id after auth because it could take some time till all data is there
    getLibrary();
    getUser();
    var createForm = document.querySelector(".create-form");
    createForm.classList.remove("hidden");
  } else {
      var login = document.querySelector(".login");
      login.classList.remove("hidden");
  }
}

function getLibrary() {
  var results = [];
      results['items'] = [];

  //spotify only want to give use 50 songs at once. So we loop till we have everything.
  var fetchNow = function(url) {
    fetch(url, getOptions)
    .then(response => response.text())
    .then(function(result) {
      result = JSON.parse(result);
      result.items.forEach(element => {
        results['items'].push(element);
      })
      if(result.next) {
        fetchNow(result.next);
      }
    });
  }

  fetchNow('https://api.spotify.com/v1/me/tracks?limit=50');
  
  userLibrary = results;
}

function getUser() {
  fetch("https://api.spotify.com/v1/me", getOptions)
  .then(response => response.text())
  .then(result => {
    result = JSON.parse(result);
    userID = result.id;
  })
  .catch(error => console.log('error', error));
}

function createPlaylistWithTracks(name, tracks) {
  //copy header as local var so we can modify it only for this request
  var requestHeader = requestHeader;
  requestHeader.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "name": name,
    "description": "All my liked songs from " + name + ". Generated with Monthly Playlist for Spotify by @Alystxo and @MarcoPNS"
  });
  var postOptions = {
    method: 'POST',
    headers: requestHeader,
    body: raw,
    redirect: 'follow'
  };
  var playlistID = '';

  fetch("https://api.spotify.com/v1/users/"+ userID +"/playlists", postOptions)
  .then(response => response.text())
  .then(result => {
    result = JSON.parse(result);
    playlistID = result.id;
    raw = JSON.stringify({
      "uris": tracks,
    });
    postOptions.body = raw;
    fetch("https://api.spotify.com/v1/playlists/"+ playlistID +"/tracks", postOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result)))
    .catch(error => console.log('error', error));
  })
  .catch(error => console.log('error', error));
}

function getHashValue(key) {
  var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
  return matches ? matches[1] : null;
}
