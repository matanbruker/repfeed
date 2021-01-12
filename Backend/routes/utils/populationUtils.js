const axios = require("axios");

//the Twitter api and api key
const users_api_url = "https://api.twitter.com/2";
const token = process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");


/**
 *  get all the friends IDs that have this filters
  get all the tweets IDs of those friends.
 * @param {*} age : age of the friends
 * @param {*} country : country of the friends
 * @param {*} party : party of the friends
 * @param {*} gender of the friends
 * @param {*} race of the friends
 */
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

    // if there is tweets for the friends that have those filters, get the tweets IDs 
    if (tweets_IDs_for_specific_friend.length != 0) {
        for (let tweet of tweets_IDs_for_specific_friend) {

            tweets_IDs.push(tweet.tweet_id);
        }
    }
    return tweets_IDs;
}


/**
 * sent to the Twitter Api the list of all tweets IDs, 
    and get a list of all the tweets that exist in twitter,
    for every tweet we get the tweet_id and tweet_text.
    return list of tweets_text
 * @param {*} tweets_IDS : list of tweets IDs
 */
async function getTweetsFromTwitterAPI(tweets_IDS) {
    let show_tweets = []
    let tweet_list = []
    for (let tweets of tweets_IDS) {
        tweet_list = tweets.split(/[ ]+/);
        show_tweets.push.apply(show_tweets, tweet_list)

    }

    // get random tweets from the list to sent the front
    show_tweets = getRandomElements(show_tweets, 99);

    show_tweets = show_tweets.toString().replace("'", "");
    console.log(show_tweets)
    let tweets = await axios.get(`${users_api_url}/tweets?ids=${show_tweets}`, {
        headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
    });

    let tweets_text = [];

    //  for every tweet get only the tweet text.
    for (let tweet of tweets.data.data) {
        tweets_text.push(tweet.text);
    }

    return tweets_text;
}


/**
 * get a random elemnts from the array
 * @param {*} array : array to choose elemnts from
 * @param {*} n : num of elemnts to return 
 */
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

/**
 * set the data from the Get request(URL) to the varibels.
 * call the functions to get the data by this varibels.
 * return list of tweets text.
 * @param {*} param : the data from the get request (URL) 
 */
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
