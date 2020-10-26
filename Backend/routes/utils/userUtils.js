const axios = require("axios");

//change to the right api and api key
const users_api_url = "https://api.twitter.com/1.1/followers/";
const api_key = "Bearer " + process.env.twitter_apiKey;

async function followers() {
  let followers = await axios.get(`${users_api_url}
/list.json?cursor=-1&screen_name=realDonaldTrump&skip_status=true&include_user_entities=false${api_key}`);
  console.log(followers);
}

exports.followers = followers;
