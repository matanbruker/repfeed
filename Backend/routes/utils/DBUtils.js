require("dotenv").config();
const sql = require("mssql");
require("msnodesqlv8");


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

async function getUsersByScore(score) {
  console.log(score);
  let db_answer = [];
  // db_answer = await execQuery(`select top 5 user_id from panel_index_test where pol_affl = ${score} order by newid()`);
  db_answer = await execQuery(`select top 5 user_id from panel where pol_affl = ${score} order by newid()`);
  console.log(db_answer);
  return db_answer;
}

async function getUserFreinds(user_id) {
  let db_answer = await execQuery(`select top 5 friend_uid from friendships_index_test where panel_uid  ='${user_id}' and has_tweets = 1 order by newid()`);
  // let db_answer = await execQuery(`select top 5 friend_uid from friendships where panel_uid  ='${user_id}' and has_tweets = 1 order by newid()`);
  return db_answer;
}

// order tweet date from the newest to the oldest
async function getFriendsTweetsIds(user_id) {
  let db_answer = await execQuery(`SELECT top 10 friend_tweetList.tweet_id 
  FROM friend_tweetList
  INNER JOIN friendships_index_test 
  ON friend_tweetList.user_id=friendships_index_test.friend_uid
  Where friendships_index_test.panel_uid  ='${user_id}'
  order by newid()`);
  

  // let db_answer = await execQuery(`SELECT top 10 friend_tweetList.tweet_id 
  // FROM friend_tweetList
  // INNER JOIN friendships 
  // ON friend_tweetList.user_id=friendships.friend_uid
  // Where friendships.panel_uid  ='${user_id}'
  // order by newid()`);
  
  return db_answer;
}


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
  let db_answer = await execQuery("SELECT top 25 friend_tweetList.tweet_id FROM friend_tweetList INNER JOIN (select distinct friend_uid from friendships_index_test where age_bucket  = " +
  sql_age_bucket +
    " and state_code  = " + sql_country +
    " and party  = " + sql_party +
    " and sex  = " + sql_gender +
    " and race_ethnicity  = " + sql_race +
    " and has_tweets = 1) as r ON friend_tweetList.user_id = r.friend_uid order by newid()"
  );

  // Query (insted of upper query) for the updated static tweets - do not run while the python running!

  // let db_answer = await execQuery("SELECT top 25 friend_staticTweetList.tweet_id FROM friend_staticTweetList INNER JOIN (select distinct friend_uid from friendships_index_test where age_bucket  = " + 
  // sql_age_bucket + 
  // " and state_code = " + sql_country + 
  // " and party  = " + sql_party + 
  // " and sex = " + sql_gender +
  // " and race_ethnicity = " + sql_race + 
  // " and has_tweets = 1 ) as r ON friend_staticTweetList.user_id= r.friend_uid WHERE friend_staticTweetList.fixed = 1 " + 
  // " and friend_staticTweetList.tweet_id != 'none' order by newid()"
  // );

  return db_answer;
}


module.exports = {
  execQuery: execQuery,
  getUsersByScore: getUsersByScore,
  getUserFreinds: getUserFreinds,
  getFriendsTweetsIds: getFriendsTweetsIds,
  getTweetsByFilters: getTweetsByFilters,
};
