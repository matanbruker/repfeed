var express = require("express");
var router = express.Router();

const populationUtils = require("./utils/populationUtils");
const DBUtils = require("./utils/DBUtils");


/**
 * for Get request with this parameters
 * call "buildPopulationFeedByFilters" function and send the params.
 * send the result back to the front
 */
router.get("/:age/:country/:party/:gender/:race", (req, res) => {
  populationUtils
    .buildPopulationFeedByFilters(req.params)
    .then((tweets_text) => res.send(tweets_text))
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

module.exports = router;
