require("dotenv").config();
const sql = require("mssql");
require("msnodesqlv8");

// set DB connection details
const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  options: {
    enableArithAbort: true,
    trustedConnection: true

  },
  dialect: "mssql",
  dialectOptions: {
    requestTimeout: 300000
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

};


const pool = new sql.ConnectionPool(config);
const poolConnect = pool
  .connect()
  .then(() => console.log("new connection pool Created"))
  .catch((err) => console.log(err));

async function execQuery(query) {
  await poolConnect;
  try {
    var result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

execQuery().catch((error) => console.log(`Error in executing ${error}`));


// =============== Queries ===============

// get all the users IDs that have this score
async function getUsersByScore(score) {
  let db_answer = [];
  db_answer = await execQuery(`select top 5 user_id from panel where pol_affl = ${score} order by newid()`);
  return db_answer;
}

// get all the friends IDs of this user
async function getUserFriends(user_id) {
  let db_answer = await execQuery(`SELECT TOP 10 friend_uid FROM currentFriendships WHERE panel_uid = '${user_id}' ORDER BY newid()`);

  return db_answer;
}

// get all the tweets IDs of this user
// order tweet date from the newest to the oldest
async function getFriendTweets(friend_id)
{
  let db_answer = await execQuery(`SELECT tweet_id FROM friend_currentStaticTweetList WHERE user_id = '${friend_id}'`);

  return db_answer;
}


// order tweet date from the newest to the oldest
async function getFriendsTweetsIds(user_id) {
  let db_answer = await execQuery(`SELECT top 10 friend_currentStaticTweetList.tweet_id 
  FROM friend_currentStaticTweetList
  INNER JOIN currentFriendships 
  ON friend_currentStaticTweetList.user_id=currentFriendships.friend_uid
  Where currentFriendships.panel_uid  ='${user_id}'
  order by newid()`);
  
  return db_answer;
}

// get all the friends with this filters
// and than get all the tweets IDs of those friends
async function getTweetsByFilters(age_bucket, country, party, gender, race) {
  let sql_age_bucket = "'" + age_bucket + "'";
  let sql_country = "'" + country + "'";
  let sql_party = "'" + party + "'";
  let sql_gender = "'" + gender + "'";
  let sql_race = "'" + race + "'";


  if (age_bucket === "age_bucket") {
    sql_age_bucket = "age_bucket";
  }
  if (country === "country") {
    sql_country = "state_code";
  }
  if (party === "party") {
    sql_party = "party";
  }
  if (gender === "gender") {
    sql_gender = "sex";
  }
  if (race === "race") {
    sql_race = "race_ethnicity";
  }
  let db_answer = await execQuery("SELECT top 25 friend_currentStaticTweetList.tweet_id FROM friend_currentStaticTweetList INNER JOIN (select distinct friend_uid from currentFriendships where age_bucket  = " +
  sql_age_bucket +
    " and state_code  = " + sql_country +
    " and party  = " + sql_party +
    " and sex  = " + sql_gender +
    " and race_ethnicity  = " + sql_race +
    " ) as r ON friend_currentStaticTweetList.user_id = r.friend_uid order by newid()"
  );

  return db_answer;
}


module.exports = {
  execQuery: execQuery,
  getUsersByScore: getUsersByScore,
  getUserFriends: getUserFriends,
  getFriendsTweetsIds: getFriendsTweetsIds,
  getTweetsByFilters: getTweetsByFilters,
  getFriendTweets: getFriendTweets,
};
