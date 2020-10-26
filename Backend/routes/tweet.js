var express = require("express");
var router = express.Router();
const axios = require("axios");

const tweetUtils = require("./utils/tweetUtils");

//need to add the right domai
const api_domain = "https://api.spoonacular.com/recipes";


router.use((req,res,next) => {
    console.log("Tweet route");
    next();
});



module.exports = router;
