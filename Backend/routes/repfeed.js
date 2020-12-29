var express = require("express");
var router = express.Router();

const repfeedUtils = require("./utils/repfeedUtils");
const DBUtils = require("./utils/DBUtils");




router.get("/followers", (req, res) => {

    repfeedUtils
    .followers()
    .then((users_data) => res.send(users_data))
    .catch((error) => {
        console.log(error);
        res.sendStatus(404);
    });
  
  });

  router.get("/", (req, res) => {

    repfeedUtils
    .getTweetByScore(req)
    .then((users_data) => res.send(users_data))
    .catch((error) => {
        console.log(error);
        res.sendStatus(404);
    });
  
  });












module.exports = router;
