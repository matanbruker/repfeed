const axios = require("axios");

//change to the right api and api key
const users_api_url = "https://api.twitter.com/2";
const token = process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");

let tweets_IDs = [];

// async function followers() {
// //   let followers = await axios.get(`${users_api_url}
// // /list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`);

// ////////////////////////////////////////////////////////////////////
// let followers = await axios.get(`${users_api_url}/list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`, {
//  headers: {
//    Authorization: 'Bearer ' + token //the token is a variable which holds the token
//  }
// })

// //console.log(followers);
// //console.log(followers.data);
// //console.log(followers.data.users);

// const users_data = followers.data
// return users_data
// //console.log(followers[data][users]);

// }

async function getUsersByScore(score) {
  // get the score from the front
  // let score = req.param

  // go to DB - get all the users with this score
  let users_IDS = DBUtils.getUsersByScore(score);

  return users_IDS;
}

async function getUsersFreinds(users_IDS) {
  let friends_IDs = [];
  let friends_of_user = [];

  // for each user we take its followed users
  users_IDS.forEach((user_id) => {
    //get this user the users that he followed
    // TODO: maybe take followers from twitter API
    friends_of_user = DBUtils.getUserFreinds(user_id);

    friends_of_user.forEach((friend) => {
      if (!friends_IDs.includes(friend)) {
        friends_IDs.push(friend);
      }
    });
  });

  return friends_IDs;
}

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

async function buildRepFeedByBar(score) {
  tweets_IDs = [];

  users_IDS = getUsersByScore(score);
  friends_IDS = getUsersFreinds(users_IDS);
  getUsersTweetsID(friends_IDS);

  // Call function that show the newest tweets
  tweets_text = showTweets();

  return tweets_text;
}

async function resetRepFeed() {
  tweets_IDs = [];
}

exports.buildRepFeedByBar = buildRepFeedByBar();
exports.showTweets = showTweets();
exports.resetRepFeed = resetRepFeed();
