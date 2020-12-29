var express = require("express");
var router = express.Router();

const populationUtils = require("./utils/populationUtils");
const DBUtils = require("./utils/DBUtils");


router.get("/populationFeed", (req, res) => {
    if(req.moreTweets == false){
        populationUtils
        .buildPopulationFeedByFilters(req.age, req.country, req.party, req.gender, req.race)
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
            console.log(error);
            res.sendStatus(404);
        });
    }else{
        populationUtils
        .showTweets()
        .then((tweets_text) => res.send(tweets_text))
        .catch((error) => {
            console.log(error);
            res.sendStatus(404);
        });
    }
    );
}