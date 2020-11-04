
// Open Twitter library
var Twit = require('twit');

// Look into our config file to find the correct keys to our twitter dev account
var T = new Twit(require('./config.js'));

// URL of a search for the latest tweets on the '#britneyspears' hashtag.
var music = {q: "#britneyspears", count: 5, result_type: "recent"}; 


//Helper function for tweetLatest() that searches the text from another user's tweet and see if there is any instance where Britney Spears name is found.
function emphasizeArtist(retweetText) {
    
    //split the string of the text from the other users' tweet into an array of strings based off the spaces in the sentences.
    var str = retweetText.split(' ');
    //boolean describing whether Britney's name was found in the tweet.
    var foundName = false;
    
    //loop through each string in the user text array; if there is a match with Britney's, replace her name with all capitals
    //to emphasize remembering her name and the freeBritney Movement
    for (var i = 0; i < str.length; ++i) {
        if ((str[i] === "Britney") || (str[i] === "britney") || (str[i] === "Britney ") || (str[i] === "Britney,") || (str[i] === "Britney, ")) {
            str[i] = "BRITNEY";
            foundName = true;
        } else if ((str[i] === "spears") || (str[i] === "spears") || (str[i] === "Spears,")) {
            str[i] = "SPEARS";
            foundName = true;
        } else if ((str[i] === "#BritneySpears") || (str[i] === "#BritneySpears ") || (str[i] === "@BritneySpears")) {
            str[i] = "#BRITNEYSPEARS";
            foundName = true;
        }
    }
    
    //in the variable editedString recombine the newly changed string array
    var editedStr;
    var randomNumber = Math.random();
    for (var j = 0; j < str.length; ++j) {
        editedStr = editedStr + " " + str[j];
    }
    
    var finalStr = "Learn more about #FreeBritney here: ";
    var linkText = "https://bit.ly/3jWz6pQ";
    
    //if the tweet directly mentioned Britney's name, we will tweet out what that user said with the new 
    //emphasis on remembering her name and the movement
    if (foundName) {
        var introStr = "A user said this about BRITNEY SPEARS: \n";
        editedStr = introStr + editedStr;
        editedStr = editedStr + finalStr;

    //if no user mentioned Britney's name in their actual tweet, a randomized number will chose which response will be tweeted 
    // out with a link to learn more about Britney's conservatorship.
    } else {
        if (randomNumber < 0.1) {
            var intro = "No user mentioned Britney's name. To hear more about the situation with Britney check out this: ";
            editedStr = intro + linkText;
        } else if (randomNumber < 0.2) {
            editedStr = "A user said this about Britney: \n" + retweetText + "\n Learn more about her situation at: " +linkText;
        } else if (randomNumber < 0.3) {
            editedStr = "Britney's name wasn't mentioned in this tweet :( to hear more about her situation, check out: " + linkText;
        } else if (randomNumber < 0.4) {
            editedStr = "No tweet said #BRITNEYSPEARS. To learn more about her situation read https://rb.gy/xz6cyq" + linkText;
        } else if (randomNumber < 0.5) {
            editedStr = "No mention of how Toxic Britney's current situation is. Check out: " + linkText;
        } else if (randomNumber < 0.6) {
            editedStr = "A user said this about Britney: \n" + retweetText + "\n To learn about her convervatorship: " + linkText;
        } else if (randomNumber < 0.7) {
            editedStr = "Here's what this Twitter user is saying about Britney: " + retweetText + "\n Learn more at: " + linkText;
        } else if (randomNumber < 0.9) {
            editedStr = "One user said this about Britney: \n" + retweetText + "\n To know what her conservatorship means, read: " + linkText;
        } else {
            editedStr = "No Britney name mention detected. Instead try out this site: \n" + linkText;
        }
    }
    
    //return the edited text that our bot will tweet out
    return editedStr;
}



//Function that tweets an edited version of another user's tweet related to Britney Spears 
function tweetLatest() {
    T.get('search/tweets', music, function (error, data) {
      console.log(error, data);
	  if (!error) {
		var tweetText = emphasizeArtist(data.statuses[0].text);
       
		T.post('statuses/update', {status: tweetText}, function (error, response) {
			if (response) {
				console.log('Success! Your bot tweeted!')
			}
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // Catch errors if the search could not find a tweet under the hastag
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
    
    
}

// Function searches for the latest tweets tagged #britneyspears and then retweets them.
function retweetLatest() {
	T.get('search/tweets', music, function (error, data) {
	  console.log(error, data);
	  if (!error) {
	  	// Finds the ID of the latest tweet
		var retweetId = data.statuses[0].id_str;
        
		// Retweets other user's onto our bot's stream
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// Prints out errors related to trying to post on Twitter
			if (error) {
				console.log('There was an error with Twitter:', error)
			}
		})
	  }
	  // Print out any errors that might occur with the hashtag search
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}


//Tweets a preselected image of Britney out with a description
function tweetBritneyImage() {
    var fs = require("fs")
    var randomImgNum = Math.random();
    var imageData;
  //A randomized number picks which image will   
    if (randomImgNum < 0.3) {
        imageData = fs.readFile('brit.jpg', function() {}) //replace with the path to your image
    } else if (randomImgNum < 0.5) {
        imageData = fs.readFile('britneyPic.jpg', function() {}) //replace with the path to your image
    } else if (randomImgNum < 0.7) {
        imageData = fs.readFile('BS_Health.jpg', function() {}) //replace with the path to your image
    } else {
        imageData = fs.readFile('Britney_Conv.jpg', function() {}) //replace with the path to your image
    }
  
//Uploads the image to Twitter
T.post("media/upload", {media: imageData}, function(error, media, response) {
  if (error) {
    console.log(error)
  } else {
    
      //Writes the text that will make up the status of the post.
      var status = {
      status: "We all loved Toxic, but now its time for Britney to step out of her toxic conservatorship!",
      media_ids: media.media_id_string
    }
    
    //Actually posts both the media and text to Twitter
    T.post("statuses/update", status, function(error, tweet, response) {
      if (error) {
        console.log(error)
      } else {
        console.log("Successfully tweeted an image!")
      }
    })
  }
})
}
    
           

//Run Twitter functions to tweet and retweet
retweetLatest();
tweetLatest();
tweetBritneyImage();

//set time intervals for when each tweet or retweet will post
setInterval(tweetLatest, 1000 * 60 * 60); //tweet every hour
setInterval(retweetLatest, 7,200,000); //retweet every two hours
setInterval(tweetBritneyImage(), 1000 * 60 * 60)
