function sortSongs (input){

    //Array for results. 
    var tracks = [];

    input.items.forEach(element => {
        //Defining dates. 
        var added_at = new Date(element.added_at)
        var date = (added_at.toLocaleString('default', { month: 'long', year: '2-digit'}))

        //Filling the array with tracks and dates. 
        if (tracks[date]) {
            tracks[date].push(element.track.uri);
        } else {
            tracks[date] = [element.track.uri];
        }
        
    });

    console.log(tracks)
}

sortSongs(data)

//Falls du noch Bock hast gibt es hier bei Exercises: https://www.w3schools.com/js/exercise_js.asp?filename=exercise_js_variables1
