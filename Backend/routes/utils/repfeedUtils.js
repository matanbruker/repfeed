const axios = require("axios");
const { columns } = require("mssql");

//the Twitter api and api key
const users_api_url = "https://api.twitter.com/2";
const token = process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");

/**
 * get all the users IDs that have this score
 * return list of users IDs
 * @param {*} score : int, the user political score
 */
async function getUsersByScore(score) {
  // get the score from the front
  // go to DB - get all the users with this score
  let users_IDS = [];
  users_IDS = await DBUtils.getUsersByScore(score);

  return users_IDS;
}

/**
 * get the users IDs of all the friend of the users in the "users_IDS" list
 * get all the tweets IDs for every friend.
 * return a list of all tweets IDS from all the friends. 
 * @param {*} users_IDS : list of usres IDs
 */
async function getUsersFreindsTweetsIDs(users_IDS) {

  let tweets_IDs = [];
  let tweets_IDs_for_specific_friend = [];
  if (users_IDS != null) {

    // call function from the DB to get the friend's tweets 
    for (let user of users_IDS) {
        tweets_IDs_for_specific_friend = await DBUtils.getUserTweetsIds(user.user_id);

        // if this friends has tweets. get there IDs
        if (tweets_IDs_for_specific_friend.length != 0) {
          for (let tweet of tweets_IDs_for_specific_friend) {

            tweets_IDs.push(tweet.tweet_id);
          }
        }
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
  
  // send requst to the Twitter API with String of all the tweets IDs 
  let tweets = await axios.get(`${users_api_url}/tweets?ids=${show_tweets}`, {
    headers: {
      Authorization: "Bearer " + token, //the token is a variable which holds the token
    },
  });

  let tweets_text = [];

//  for every tweet get only the tweet text.
  if(tweets.data.data.length !=0 ){
    for (let tweet of tweets.data.data) {
      tweets_text.push(tweet.text);
    }
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
 * get the tweets text from the friends of all the users with this score
 * @param {*} score : int, the score from the Get request params
 */
async function buildRepFeedByBar(score) {

  let users_IDS = [];
  let tweets_IDS = [];
  let tweets_text = [];

  // get all the users with this score from the DB
  users_IDS = await getUsersByScore(score);

  // if there is users with this score, 
  // for every user get all his friends IDs,
  // and for every friend get all his tweets IDs
  if (users_IDS.length != 0) {
    tweets_IDS = await getUsersFreindsTweetsIDs(users_IDS)

    // ןf there are tweets, send the tweets to the Twitter API
    // and return a list of all the text of each tweet
    if (tweets_IDS.length != 0) {
      tweets_text = await getTweetsFromTwitterAPI(tweets_IDS)

    }
  }

  return tweets_text;
}

/**
 * get the tweets text from the friends of all the users (without specific score)
 */
async function resetRepFeed() {

  let users_IDS = [];
  let tweets_IDS = [];
  let tweets_text = [];

  // get all the users from the DB
  users_IDS = await getUsersByScore('pol_affl');

 
  // for every user get all his friends IDs,
  // and for every friend get all his tweets IDs
  if (users_IDS.length != 0) {
    tweets_IDS = await getUsersFreindsTweetsIDs(users_IDS)

    // ןf there are tweets, send the tweets to the Twitter API
    // and return a list of all the text of each tweet
    if (tweets_IDS.length != 0) {
      tweets_text = await getTweetsFromTwitterAPI(tweets_IDS)

    }
  }

  return tweets_text;


}

// =============== Exports ===============
exports.buildRepFeedByBar = buildRepFeedByBar;
exports.resetRepFeed = resetRepFeed;
