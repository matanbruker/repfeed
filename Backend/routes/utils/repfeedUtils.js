const axios = require("axios");
const { columns } = require("mssql");

//change to the right api and api key
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
  let list_list_tweets_IDs_for_user_friends = [];
  if (users_IDS != null) {

    for (let user of users_IDS) {
      list_list_tweets_IDs_for_user_friends = await DBUtils.getFriendsTweetsIds(user.user_id);

        if (list_list_tweets_IDs_for_user_friends.length != 0) {
          for (let tweets_list of list_list_tweets_IDs_for_user_friends) {

            tweets_list = tweets_list.tweet_id.split(/[ ]+/)
            for(let tweet of tweets_list){
                tweets_IDs.push(tweet);
            }
          }
        }
    }

  }
  tweets_IDs = [...new Set(tweets_IDs)];

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
  // console.log(array)
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

  // console.log(selected)
  return selected
}

/**
 * get the tweets text from the friends of all the users with this score
 * @param {*} score : int, the score from the Get request params
 */
async function buildRepFeedByBar(score) {

  // get start time
  let start_repfeed_score = new Date()

  let users_IDS = [];
  let tweets_IDS = [];

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
      tweets_IDS = await getTweetsFromTwitterAPI(tweets_IDS)

    }
  }

  //get end time
  let end_repfeed_score = new Date()
  // print start timr and end time
  console.log("Start Request Repfeed", start_repfeed_score.toISOString().slice(11, 23));
  console.log("End   Request Repfeed", end_repfeed_score.toISOString().slice(11, 23));


  return tweets_IDS;

}

/**
 * get the tweets text from the friends of all the users (without specific score)
 */
async function resetRepFeed() {

  // get start time
  let start_repfeed_reset = new Date()


  let users_IDS = [];
  let tweets_IDS = [];

  // get all the users from the DB
  users_IDS = await getUsersByScore('pol_affl');

  // for every user get all his friends IDs,
  // and for every friend get all his tweets IDs
  if (users_IDS.length != 0) {
    tweets_IDS = await getUsersFreindsTweetsIDs(users_IDS)

    // ןf there are tweets, send the tweets to the Twitter API
    // and return a list of all the text of each tweet
    if (tweets_IDS.length != 0) {
      tweets_IDS = await getTweetsFromTwitterAPI(tweets_IDS)

    }
  }

  //get end time
  let end_repfeed_reset = new Date()
  // print start timr and end time
  console.log("Start Request Reset Repfeed", start_repfeed_reset.toISOString().slice(11, 23));
  console.log("End   Request Reset Repfeed", end_repfeed_reset.toISOString().slice(11, 23));

  return tweets_IDS;


}

exports.buildRepFeedByBar = buildRepFeedByBar;
exports.resetRepFeed = resetRepFeed;
