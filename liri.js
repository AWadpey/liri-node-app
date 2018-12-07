require("dotenv").config();


var keys = require("./keys.js");
var fs = require("fs");
var axios = require('axios');
var moment = require('moment')
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var input = process.argv[3];
var command = process.argv[2];


//switch for different commands
switch (command) {
    case "concert-this":
        bandsInTown(input);
        break;

    case "spotify-this-song":
        spotifyThisSong(input);
        break;

    case "movie-this":
        movieThis(input);
        break;

    case "do-what-it-says":
        doWhatItSays(input);
        break;

// istructions for other users
    default: console.log("\n" + "type any command after 'node liri.js': " + "\n" +
        "concert-this" + "\n" +
        "spotify-this-song" + "\n" +
        "movie-this" + "\n" +
        "do-what-it-says" + "\n" +
        "use quotes for multiword titles!");        
};

function bandsInTown(bandsInTown) {
    axios.get(
        "https://rest.bandsintown.com/artists/" + bandsInTown + "/events?app_id=codingbootcamp"
    ).then(function (response) {
        let reply = response.data;
        console.log(bandsInTown + " has " + reply.length + " upcoming concerts!");
        for (let i = 0; i < reply.length; i++) {
            console.log(` `);
            console.log("Venue: " + reply[i].venue.name);
            console.log("Location: " + reply[i].venue.city + ", " + reply[i].venue.country);
            console.log("Date: " + moment(reply[i].datetime).format("MMM Do, YYYY"));
            console.log('------------------------------------------');
        };
    });
};


function spotifyThisSong(spotifySong) {
    var spotifySong = process.argv[3];
    if (!spotifySong) {
        spotifySong = "The Sign";
    };
    songRequest = spotifySong;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "\n" +
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n" +
                            "-----------------------------------"

                        console.log(spotifyResults);
                        console.log(' ');
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};


function movieThis(movieThis) {
    if (movieThis === undefined) { movieThis = 'Mr. Nobody' };
    axios.get(
        "http://www.omdbapi.com/?t=" + movieThis + "&y=&plot=short&apikey=trilogy").then(function (response) {
        let reply = response.data
            console.log('');
            console.log("Title: " + reply.Title);
            console.log("Year: " + reply.Year);
            console.log("Actors: " + reply.Actors)
            console.log("Origin Country: " + reply.Country);
            console.log("Language: " + reply.Language);
            console.log("Plot: " + reply.Plot);
            console.log("IMDB Rating: " + reply.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + reply.Ratings[1].Value);
            console.log('---------------------------------------');                    
    });
};

function doWhatItSays() {

    fs.writeFile("random.txt", 'spotify-this-song,"I Want it That Way"', function (err) {
        var song = "spotify-this-song 'I Want it That Way'"
        if (err) {
            return console.log(err);
        };

        console.log(song);
    });
};