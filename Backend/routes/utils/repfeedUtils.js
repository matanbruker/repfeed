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


//jast a try - not working function (showing itay)
async function getTweetByScore(req) {
  //   let followers = await axios.get(`${users_api_url}
  // /list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`);
    
  score = req.param

  // go to DB
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
