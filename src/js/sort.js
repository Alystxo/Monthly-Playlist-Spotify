function sortSongs(input) {

    //Array for results. 
    var tracks = [];

    input.items.forEach(element => {
        //Defining dates. 
        var added_at = new Date(element.added_at);
        var date = monthString(added_at);

        //Filling the array with tracks and dates. 
        if (tracks[date]) {
            tracks[date].push(element.track.uri);
        } else {
            tracks[date] = [element.track.uri];
        } 
    });
    return tracks;
}
