var express = require("express");
var router = express.Router();

const repfeedUtils = require("./utils/repfeedUtils");
const DBUtils = require("./utils/DBUtils");

// router.get('/repfeed', (req, res) => {
//   console.log("/repfeed")

// });

// router.use((req,res,next) => {
//   // console.log(req.params.score)
//   console.log("/repfeed")
//   next();
// });

router.get("/:score", (req, res) => {
  console.log(req.params)
  console.log(req.params.score)

    if (req.params.score != null) {
      repfeedUtils
        .buildRepFeedByBar(req.params.score)
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
    // // if(req.score != null){
    // repfeedUtils
    //   .showTweets()
    //   .then((tweets_text) => res.send(tweets_text))
    //   .catch((error) => {
    //     console.log(error);
    //     res.sendStatus(404);
    //   });

    // // }
  
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
