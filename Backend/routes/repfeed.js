var express = require("express");
var router = express.Router();

const repfeedUtils = require("./utils/repfeedUtils");
const DBUtils = require("./utils/DBUtils");

//temp
router.get("/temp", (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello RepFeed');
  
});


router.get("/reset", (req, res) => {
      repfeedUtils
        .resetRepFeed()
        .then((tweets_id) => res.send(tweets_id))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });
});

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
