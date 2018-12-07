require("dotenv").config();


var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];
var bands = require('bands');
var client = new bands(keys.bands);

//switch for different commands
switch (liriReturn) {
    case "concert-this":
        bandsInTown();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        dpWhatItSays();
        break;

// istructions for other users
    default: console.log("\n" + "type any command after 'node liri.js': " + "\n" +
        "concert-this" + "\n" +
        "spotify-this-song" + "\n" +
        "movie-this" + "\n" +
        "do-what-it-says" + "\n" +
        "use quotes for multiword titles!");        
};

//command 1: concert-this
function bandsInTown() {
    var params = {  }
}

// command 2: spotify-this-song
function spotifyThisSong() {
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign";
    };
    songRequest = songName;
    spotify.search({
        type: "track",
        query: songRequest    
    },
    function(err, data) {
        if(!err) {
            var songInfo = data.tracks.items;
            for (var i = 0; i<5; i++) {
                var spotifyRequest = 
                    "Artist: " + songInfo[i].artists[0].name + "\n" +
                    "Song: " + songInfo[i].name + "\n" +
                    "Preview URL: " + songInfo[i].preview_url + "\n" +
                    "Album: " + songInfo[i].album.name + "\n"

                console.log()
            }
        }
    }
    )

}


// command 3: movie-this
function movieThis() {
    var queryUrl = "http//www.omdbapi.com/?t=" + movieName + "09b9f8c2e3f24a0c967226dc74554689";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var myMovieData = JSON.parset(body);
            var queryURLResults = 
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMBD Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Origin Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n"

                console.log(queryURLResults);
        }
        else {

        }
    })
}