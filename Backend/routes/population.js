var express = require("express");
var router = express.Router();

const populationUtils = require("./utils/populationUtils");
const DBUtils = require("./utils/DBUtils");


router.get("/:age/:country/:party/:gender/:race", (req, res) => {
    console.log(req.params)
  populationUtils
    .buildPopulationFeedByFilters(req.params)
    .then((tweets_id) => res.send(tweets_id))
    .catch((error) => {
      console.log(error);
      res.sendStatus(404).send("error: /:age/:country/:party/:gender/:race ");
    });
});



module.exports = router;
