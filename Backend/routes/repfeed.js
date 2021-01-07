var express = require("express");
var router = express.Router();

const repfeedUtils = require("./utils/repfeedUtils");
const DBUtils = require("./utils/DBUtils");

router.get("/reset", (req, res) => {
  // console.log(req.params)
  // console.log(req.params.score)

      repfeedUtils
        .resetRepFeed()
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });
  
});

router.get("/:score", (req, res) => {
  // console.log(req.params)
  // console.log(req.params.score)

      repfeedUtils
        .buildRepFeedByBar(req.params.score)
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });
  
});




module.exports = router;
