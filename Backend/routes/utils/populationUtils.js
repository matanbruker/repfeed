const axios = require("axios");

//change to the right api and api key
const twitter_api_url = "https://api.twitter.com/2";
const token = process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");

let tweets_IDs = [];

// getting the user's friends through the DBUtils module
async function getUsersFriendsByFilters(age, country, party, gender, race) {
  // get the filters from the front

  // go to DB - get all the friends of the users with this filters
  let friends_IDS = DBUtils.getUsersFriendsByFilters(age, country, party, gender, race);

  return friends_IDS;
}

// get users tweets ids through DBUtils module
// arg: list of users ids that their tweets ids should be fetched
async function getUsersTweetsID(users_IDS) {
  let tweets_IDs = [];
  let tweets_IDs_for_specific_user = [];

  users_IDS.forEach((user_id) => {
    // List of Tweet_id
    tweets_IDs_for_specific_user = DBUtils.getUserTweetsIds(user_id);
    tweets_IDs.push(tweets_IDs_for_specific_user);
  });
}


async function showTweets() {
  let num_of_tweets = 7;
  let i;
  let show_tweets = [];

  for (i = 0; i < num_of_tweets; i++) {
    if (tweets_IDs != null) {
      if (tweets_IDs[0] != null) {
        show_tweets.push(tweets_IDs[0]);
        tweets_IDs.shift();
      }
    }
  }

  getTweetsFromTwitterAPI(show_tweets);
}

// this function fetch tweets from twitter api
//arg: list of tweets ids
async function getTweetsFromTwitterAPI(show_tweets) {
  show_tweets = show_tweets.toString();

  // TODO: check if we need to sent a List to the API or one by one
  let tweets = await axios.get(`${users_api_url}/tweets?ids=${show_tweets}`, {
    headers: {
      Authorization: "Bearer " + token, //the token is a variable which holds the token
    },
  });

  let tweets_text = [];

  tweets.data.forEach((tweet) => {
    tweets_text.push(tweet.text);
  });

  return tweets_text;
}

//arg: list of filters values
async function buildPopulationFeedByFilters(param) {
  let age = param.age;
  let country = param.country;
  let party = param.party;
  let gender = param.gender;
  let race = param.race;

  tweets_IDs = [];

  friends_IDS = getUsersFriendsByFilters(age, country, party, gender, race);
  getUsersTweetsID(friends_IDS);

  // Call function that show the newest tweets
  tweets_text = showTweets();

  return tweets_text;
}

async function initFilters() {

  let filters_valuse = []
  let allAges =DBUtils.getAllAges()
  let allCountries = DBUtils.getAllCountries();
  let allParties = DBUtils.getAllParties();
  let allGenders = DBUtils.getAllGenders();
  let allRaces = DBUtils.getAllRaces();

  filters_valuse.push(allAges);
  filters_valuse.push(allCountries);
  filters_valuse.push(allParties);
  filters_valuse.push(allGenders);
  filters_valuse.push(allRaces);

  return filters_valuse

}



// =============== Exports ===============
exports.buildPopulationFeedByFilters = buildPopulationFeedByFilters;
exports.showTweets = showTweets;
exports.initFilters = initFilters;
