const axios = require("axios");

//change to the right api and api key
const users_api_url = "https://api.twitter.com/2";
const token = process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");

async function getUsersFriendsByFilters(age, country, party, gender, race) {
    // get the filters from the front
    let tweets_IDs = []
    // go to DB - get all the friends of the users with this filters
    let tweets_IDs_for_specific_friend = await DBUtils.getUsersFriendsByFilters(
        age,
        country,
        party,
        gender,
        race
    );
    if (tweets_IDs_for_specific_friend.length != 0) {
        for (let tweet of tweets_IDs_for_specific_friend) {

            tweets_IDs.push(tweet.tweet_id);
        }
    }
    return tweets_IDs;
}

// async function getUsersTweetsID(friends_IDs) {
//     let tweets_IDs = [];
//     let tweets_IDs_for_specific_friend = [];

//     if (friends_IDs != null) {
//         for (let friend of friends_IDs) {
//             tweets_IDs_for_specific_friend = await DBUtils.getUserTweetsIds(friend);
//             tweets_IDs.push(tweets_IDs_for_specific_friend);

//         }
//     }

//     return tweets_IDs;
// }

async function getTweetsFromTwitterAPI(tweets_IDS) {
    let show_tweets = []
    let tweet_list = []
    for (let tweets of tweets_IDS) {
        tweet_list = tweets.split(/[ ]+/);
        show_tweets.push.apply(show_tweets, tweet_list)

    }

    show_tweets = getRandomElements(show_tweets, 99);

    show_tweets = show_tweets.toString().replace("'", "");
    console.log(show_tweets)
    let tweets = await axios.get(`${users_api_url}/tweets?ids=${show_tweets}`, {
        headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
    });

    let tweets_text = [];

    for (let tweet of tweets.data.data) {
        tweets_text.push(tweet.text);
    }

    return tweets_text;
}

function getRandomElements(array, n) {
    // Shuffle array
    console.log(array)
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
    
  // Get sub-array of first n elements after shuffled
  let selected = array.slice(0, n);
  
    console.log(selected)
    return selected
}

async function buildPopulationFeedByFilters(param) {
    let age = param.age;
    let country = param.country;
    let party = param.party;
    let gender = param.gender;
    let race = param.race;

    tweets_IDs = [];
    tweets_text = [];

    tweets_IDS = await getUsersFriendsByFilters(
        age,
        country,
        party,
        gender,
        race
    );

    // Call function that show the newest tweets
    if (tweets_IDS.length != 0) {
        tweets_text = await getTweetsFromTwitterAPI(tweets_IDS)
    }

    return tweets_text;
}



// =============== Exports ===============
exports.buildPopulationFeedByFilters = buildPopulationFeedByFilters;
