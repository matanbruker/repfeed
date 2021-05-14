const axios = require("axios");

//change to the right api and api key
const users_api_url = "https://api.twitter.com/2";
const token = process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");


/**
 * get all the friends IDs that have this filters
 * get all the tweets IDs of those friends.
 * @param {*} age : age of the friends
 * @param {*} country : country of the friends
 * @param {*} party : party of the friends
 * @param {*} gender of the friends
 * @param {*} race of the friends
 */
async function getTweetsByFilters(age, country, party, gender, race) {
    // get the filters from the front
    let tweets_IDs = []

    // go to DB - get all the friends of the users with this filters
    let list_list_tweets_IDs = await DBUtils.getTweetsByFilters(
        age,
        country,
        party,
        gender,
        race
    );
    
    // if there is tweets for the friends that have those filters, get the tweets IDs 
    if (list_list_tweets_IDs.length != 0) {
        for (let tweets_list of list_list_tweets_IDs) {

            tweets_list = tweets_list.tweet_id.split(/[ ]+/)
            for(let tweet of tweets_list){
                tweets_IDs.push(tweet);
            }
        }
    }
    return tweets_IDs;
}


/**
 * sent to the Twitter Api the list of all tweets IDs, 
 * and get a list of all the tweets that exist in twitter,
 * for every tweet we get the tweet_id and tweet_text.
 * return list of tweets_text
 * @param {*} tweets_IDS : list of tweets IDs
 */
async function getTweetsFromTwitterAPI(tweets_IDS) {
    let show_tweets = []
    show_tweets = tweets_IDS

    // get random tweets from the list to sent the front
    show_tweets = getRandomElements(show_tweets);
    show_tweets = show_tweets.toString().replace("'", "");

    // send requst to the Twitter API with String of all the tweets IDs 
    let tweets = await axios.get(`${users_api_url}/tweets?ids=${show_tweets}`, {
        headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
    });

    let tweets_ids = [];

    //  for every tweet get only the tweet text.
    for (let tweet of tweets.data.data) {
        tweets_ids.push(tweet.id);
    }

    return tweets_ids;
}


/**
 * get a random elemnts from the array
 * @param {*} array : array to choose elemnts from
 */
function getRandomElements(array) {
    // Shuffle array
    //console.log(array)
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
  let selected = array.slice(0, 99);
  
    //console.log(selected)
    return selected
}

/**
 * set the data from the Get request(URL) to the varibels.
 * call the functions to get the data by this varibels.
 * return list of tweets text.
 * @param {*} param : the data from the get request (URL) 
 */
async function buildPopulationFeedByFilters(param) {

    let start_population = new Date()


    let age = param.age;
    let country = param.country;
    let party = param.party;
    let gender = param.gender;
    let race = param.race;

    tweets_ids = [];

    tweets_IDS = await getTweetsByFilters(
        age,
        country,
        party,
        gender,
        race
    );
            
    // Call function that show the newest tweets
    if (tweets_IDS.length != 0) {
        // console.log(tweets_IDS.length)
        tweets_ids = await getTweetsFromTwitterAPI(tweets_IDS)
    
    }

    let end_population = new Date()
    console.log("Start Request Population", start_population.toISOString().slice(11, 23));
    console.log("End   Request Population", end_population.toISOString().slice(11, 23));

    return tweets_ids;
}


// =============== Exports ===============
exports.buildPopulationFeedByFilters = buildPopulationFeedByFilters;