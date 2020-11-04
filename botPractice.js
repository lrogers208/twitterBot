
// My first try at actually trying to get the image to upload with a choice of text and or a choice of image




// function that tweets out an randomly choosen image of #freeBritney from a preset amount of images and then randomly matches a =
function tweetFreeBritney() {
     
    var fs = require('fs');
    
    var randNum = Math.random();
    if (randNum > 0.50) {
        var britneyPic = fs.readFileSync('brit.jpg');
        var randomNumText1 = Math.random();
        
        // Upload FreeBritney Picture to Twitter
        T.post('media/upload', { media_data: britneyPic }, function (err, data, response) {
        // Write Alt-text for accessiblity and to better define the image
        var mediaIdStr = data.media_id_string
        var altText = "Picture of Britney along side a #FreeBritney poster"
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
        
        if (randomNumText1 > 0.5) {
            //create the actual post with the text option 1 alongside it
            T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    // Attaches the message to the britney image in a tweet 
                    var params = { status: 'We all loved Toxic, but now its time for Britney to step out of her toxic conservatorship!', media_ids: [mediaIdStr] }

                    T.post('statuses/update', params, function (err, data, response) {
                        console.log(data);
                        console.log("Image has been tweeted");
                    })  
                }
            })
        } else {
            //create the actual post with the text option 2 alongside it
            T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    // Attaches the message to the britney image in a tweet 
                    var params = { status: 'Time for Britney to be free! End her conservatorship; check out this link for more info: https://bit.ly/3jWz6pQ', media_ids: [mediaIdStr] }

                    T.post('statuses/update', params, function (err, data, response) {
                        console.log(data)
                    })  
                }
            })
        }
    })
        
    } else {
        var britneyPic = fs.readFileSync('britneyPic.jpg');
        var randNumText2 = Math.random();

      // Upload FreeBritney Picture to Twitter
          T.post('media/upload', { media_data: britneyPic }, function (err, data, response) {
              // Write Alt-text for accessiblity and to better define the image
              var mediaIdStr = data.media_id_string
              var altText = "Picture of Britney along side text reading #FreeBritney"
              var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

              if (randomNumText2 < 0.5) {
              //create the actual post with the text alongside it
                T.post('media/metadata/create', meta_params, function (err, data, response) {
                    if (!err) {
                    // Attaches the message to the britney image in a tweet 
                        var params = { status: 'We all loved Toxic, but now its time for Britney to step out of her toxic conservatorship!', media_ids: [mediaIdStr] }

                        T.post('statuses/update', params, function (err, data, response) {
                            console.log(data)
                            console.log("Image has been tweeted");
                        })
                    }
                })
              } else {
                  T.post('media/metadata/create', meta_params, function (err, data, response) {
                    if (!err) {
                    // Attaches the message to the britney image in a tweet 
                        var params = { status: 'Britney deserves her automony. Check out this link to learn more about her conservatorship: https:s//bit.ly/3jX0LXJ', media_ids: [mediaIdStr] }

                        T.post('statuses/update', params, function (err, data, response) {
                            console.log(data)
                            console.log("Image has been tweeted");
                        })
                    }
                })
              }
       })
    }
}