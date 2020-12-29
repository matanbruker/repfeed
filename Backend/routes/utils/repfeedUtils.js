const axios = require("axios");

//change to the right api and api key
const users_api_url = "https://api.twitter.com/1.1/followers";
const token =process.env.twitter_apiKey;

const DBUtils = require("./DBUtils");


async function followers() {
//   let followers = await axios.get(`${users_api_url}
// /list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`);
  

////////////////////////////////////////////////////////////////////
let followers = await axios.get(`${users_api_url}/list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`, {
 headers: {
   Authorization: 'Bearer ' + token //the token is a variable which holds the token
 }
})

//console.log(followers);
//console.log(followers.data);
//console.log(followers.data.users);

const users_data = followers.data
return users_data
//console.log(followers[data][users]);

}


async function getUsersByScore(req) {

  // get the score from the front
  let score = req.param

  // go to DB - get all the users with this score
  let users_IDS = DBUtils.getUsersByScore(score)

  return users_IDS

}

async function getUsersFreinds(users_IDS) {

  let friends_IDs = []
  let friends_of_user = []

  // for each user we take its followed users
  users_IDS.forEach(user_id => {

    //get this user the users that he followed
    // TODO: maybe take followers from twitter API
    friends_of_user = DBUtils.getUserFreinds(user_id)

    friends_of_user.forEach(friend => {

      if(!friends_IDs.includes(friend)){
          friends_IDs.push(friend)
      }
    });

  });

  return friends_IDs

}
//


async function getUsersTweetsID(users) {

  let tweets_IDs = []

  users.forEach(user => {

    tweets_IDs_for_specific_user = 
    
  });

}







//jast a try - not working function (showing itay)
async function getTweetByScore(req) {
  //   let followers = await axios.get(`${users_api_url}
  // /list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`);
    
  score = req.param

  // go to DB - get all the users with this score
  users = DBUtils.getUsersByScore(score)


  ////////////////////////////////////////////////////////////////////
  let followers = await axios.get(`${users_api_url}/list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`, {
   headers: {
     Authorization: 'Bearer ' + token //the token is a variable which holds the token
   }
  })
  
  //console.log(followers);
  //console.log(followers.data);
  //console.log(followers.data.users);
  
  const users_data = followers.data
  return users_data
  //console.log(followers[data][users]);
  
  }

exports.followers = followers;
