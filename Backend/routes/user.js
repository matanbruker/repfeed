var express = require("express");
var router = express.Router();

const userUtils = require("./utils/userUtils");




router.get("/followers", (req, res) => {

    userUtils
    .followers()
    .then((info_array) => res.send(info_array))
    .catch((error) => {
        console.log(error);
        res.sendStatus(404);
    });
  
  });










module.exports = router;
