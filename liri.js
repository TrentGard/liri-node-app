var action = process.argv[2];

var userInput = '';

	for (var i = 3; i < process.argv.length; i++) {
		userInput += ' ' + process.argv[i]
	};

var Twitter = require('twitter');

var twitterKeys = require('./keys.js');
 
var twitterClient = new Twitter(twitterKeys);

var Spotify = require('node-spotify-api');

var spotifyKeys = require('./spotifykey.js');
 
var spotify = new Spotify(spotifyKeys);

var request = require('request');

var fs = require('fs');

//switch statements for action inputs
switch (action) {
    case "my-tweets":
    case "tweet":
    case "tweets":
    case "t":
        fireTweets();
        break;
    case "spotify-this-song":
    case "spotify":
    case "spot":
    case "s":
        // userInput = process.argv[3],
        fireSpotify();
        break;
    case "movie-this":
    case "movie":
    case "movies":
    case "m":
        // userInput = process.argv[3],
        fireMovie();
        break;
    case "do-what-it-says":
    case "do-it":
    case "do":
    case "d":
        fireDoIt();
        break;  
    default:
        console.log("===============================================");
        console.log("Error, please follow one of these formats.");
        console.log("=============");
        console.log("node liri.js my-tweets");
        console.log("=============");
        console.log("node liri.js spotify-this-song '<song name here>'");
        console.log("=============");
        console.log("node liri.js movie-this '<movie name here>'");
        console.log("=============");
        console.log("node liri.js do-what-it-says");
        console.log("===============================================");   
};

function fireTweets() {

	var params = {
	screen_name: 'trentdiggity1',
	count: 20
	};

	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
		
		if (error) return error;
	  	
	  	if (!error) {

		    console.log("=====start of tweets=====");

		    for (var i = 0; i < tweets.length; i++) {
		    	console.log(tweets[i].text);
		   	};

		  	console.log("=====end of tweets=====")
	  	};

	});

};

function fireSpotify() {

	if (userInput === '' || userInput === undefined) {
		userInput = "The Sign";
	}

	spotify.search({ type: 'track', query: userInput }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 
	console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
	console.log("Song Name: " + data.tracks.items[0].name);
	console.log("Preview Link: " + data.tracks.items[0].preview_url);
	console.log("Album: " + data.tracks.items[0].album.name); 

	});

};

function fireMovie() {

	if (userInput === "" || userInput === undefined) {
		userInput = "Mr. Nobody";
	};

	var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&plot=short&apikey=40e9cece";

	request(queryURL, function(error, response, body) {
		if (error) {
			console.log(error);
			return;
		};

	console.log("Title: " + JSON.parse(body).Title);
	console.log("Year: " + JSON.parse(body).Year);
	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
	console.log("Country: " + JSON.parse(body).Country);
	console.log("Language: " + JSON.parse(body).Language);
	console.log("Plot: " + JSON.parse(body).Plot);
	console.log("Actors: " + JSON.parse(body).Actors);

	});
}

function fireDoIt() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			console.log(error)
		}
		console.log(data)
	});
};