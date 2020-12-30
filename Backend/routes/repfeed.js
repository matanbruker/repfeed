var express = require("express");
var router = express.Router();

const repfeedUtils = require("./utils/repfeedUtils");
const DBUtils = require("./utils/DBUtils");

router.get("/repFeed", (req, res) => {
  if (req.moreTweets == false) {
    if (req.score != null) {
      repfeedUtils
        .buildRepFeedByBar(req.score)
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });
    } else {
      repfeedUtils
        .resetRepFeed()
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });
    }
  } else {
    // if(req.score != null){
    repfeedUtils
      .showTweets()
      .then((tweets_text) => res.send(tweets_text))
      .catch((error) => {
        console.log(error);
        res.sendStatus(404);
      });

    // }
  }
});

// router.get("/", (req, res) => {

//   repfeedUtils
//   .getTweetByScore(req)
//   .then((users_data) => res.send(users_data))
//   .catch((error) => {
//       console.log(error);
//       res.sendStatus(404);
//   });

// });

module.exports = router;
