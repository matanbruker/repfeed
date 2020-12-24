var express = require("express");
var router = express.Router();

const userUtils = require("./utils/userUtils");
const DBUtils = require("./utils/DBUtils");




router.get("/followers", (req, res) => {

    userUtils
    .followers()
    .then((users_data) => res.send(users_data))
    .catch((error) => {
        console.log(error);
        res.sendStatus(404);
    });
  
  });

  router.get("/", (req, res) => {

    userUtils
    .getTweetByScore(req)
    .then((users_data) => res.send(users_data))
    .catch((error) => {
        console.log(error);
        res.sendStatus(404);
    });
  
  });












module.exports = router;
