const axios = require("axios");
const { columns } = require("mssql");

//change to the right api and api key
const users_api_url = "https://api.twitter.com/2";
const token = process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");


async function getUsersByScore(score) {
  // get the score from the front
  // go to DB - get all the users with this score
  let users_IDS = [];
  users_IDS = await DBUtils.getUsersByScore(score);

  return users_IDS;
}


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


async function getTweetsFromTwitterAPI(tweets_IDS) {
  let show_tweets = []
  show_tweets = tweets_IDS

  show_tweets = getRandomElements(show_tweets, 99);

  show_tweets = show_tweets.toString().replace("'", "");

  let tweets = await axios.get(`${users_api_url}/tweets?ids=${show_tweets}`, {
      headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
  });

  let tweets_ids = [];

  for (let tweet of tweets.data.data) {
      tweets_ids.push(tweet.id);
  }

  return tweets_ids;
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


async function buildRepFeedByBar(score) {

  let users_IDS = [];
  let tweets_IDS = [];
  
  users_IDS = await getUsersByScore(score);

  if (users_IDS.length != 0) {
    tweets_IDS = await getUsersFreindsTweetsIDs(users_IDS)

    if (tweets_IDS.length != 0) {
      tweets_IDS = await getTweetsFromTwitterAPI(tweets_IDS)

    }
  }

  return tweets_IDS;

}

async function resetRepFeed() {

  let users_IDS = [];
  let tweets_IDS = [];
  users_IDS = await getUsersByScore('pol_affl');

  if (users_IDS.length != 0) {
    tweets_IDS = await getUsersFreindsTweetsIDs(users_IDS)

    if (tweets_IDS.length != 0) {
      tweets_IDS = await getTweetsFromTwitterAPI(tweets_IDS)

    }
  }

  return tweets_IDS;


}

exports.buildRepFeedByBar = buildRepFeedByBar;
exports.resetRepFeed = resetRepFeed;
