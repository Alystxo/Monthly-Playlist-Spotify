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

    var form = document.getElementById('form');
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var sortedTracks = sortSongs(userLibrary),
          data = new FormData(form),
          date = new Date(data.get('year')+'.'+data.get('month')),
          selectedMonth = monthString(date);

      createPlaylistWithTracks(selectedMonth, sortedTracks[selectedMonth]);
    })
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
  .then(response => response.json())
  .then(result => {
    userID = result.id;
  })
  .catch(error => console.log('error', error));
}

function createPlaylistWithTracks(name, tracks) {
  //copy header as local var so we can modify it only for this request
  var log = document.getElementById("log");
  var postHeader = new Headers();
  postHeader.append("Authorization", "Bearer " + access_token);
  postHeader.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "name": name,
    "description": "All my liked songs from " + name + ". Generated with Monthly Playlist for Spotify by @Alystxo and @MarcoPNS"
  });
  var postOptions = {
    method: 'POST',
    headers: postHeader,
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
  })
  .then(() => {
    if (playlistID !== 'undefined') {
      fetch("https://api.spotify.com/v1/playlists/"+ playlistID +"/tracks", postOptions)
      .then(response => response.text())
      .then(result => {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode('Sucess! Created Playlist ' + name));
        log.appendChild(li);
      })
    } else {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode('Failed to create Playlist ' + name));
      log.appendChild(li);
    }
  })
  .catch(error => console.log('error', error));
}

function getHashValue(key) {
  var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
  return matches ? matches[1] : null;
}

function monthString(date) {
  return date.toLocaleString('default', { month: 'long', year: '2-digit'});
}
