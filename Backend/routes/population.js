var express = require("express");
var router = express.Router();

const populationUtils = require("./utils/populationUtils");
const DBUtils = require("./utils/DBUtils");

// router.get("/init", (req, res) => {
//   populationUtils
//     .initFilters()
//     .then((filters_valuse) => res.send(filters_valuse))
//     .catch((error) => {
//       console.log(error);
//       res.sendStatus(404);
//     });
// });

router.get("/:age/:country/:party/:gender/:race", (req, res) => {
    console.log(req.params)
  populationUtils
    .buildPopulationFeedByFilters(req.params)
    .then((tweets_text) => res.send(tweets_text))
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

module.exports = router;
