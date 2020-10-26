const axios = require("axios");

//change to the right api and api key
const users_api_url = "https://api.twitter.com/1.1/followers";
const token =process.env.twitter_apiKey;

async function followers() {
//   let followers = await axios.get(`${users_api_url}
// /list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`);
  

////////////////////////////////////////////////////////////////////
let followers = await axios.get(`${users_api_url}/list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false`, {
 headers: {
   Authorization: 'Bearer ' + token //the token is a variable which holds the token
 }
})

console.log(followers);
console.log(followers.data);
console.log(followers.data.users);
//console.log(followers[data][users]);

}

exports.followers = followers;
