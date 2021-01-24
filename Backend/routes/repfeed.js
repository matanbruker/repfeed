var express = require("express");
var router = express.Router();

const repfeedUtils = require("./utils/repfeedUtils");
const DBUtils = require("./utils/DBUtils");

/**
 * for Get request with the word reset
 * call "resetRepFeed" function.
 * send the result back to the front
 */
router.get("/reset", (req, res) => {

      repfeedUtils
        .resetRepFeed()
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });
  
});

/**
 * for Get request with this parameter 
 * call "buildRepFeedByBar" function and send the param.
 * send the result back to the front
 */
router.get("/:score", (req, res) => {

      repfeedUtils
        .buildRepFeedByBar(req.params.score)
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });
  
});




module.exports = router;
