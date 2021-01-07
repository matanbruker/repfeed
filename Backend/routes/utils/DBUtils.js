require("dotenv").config();
const sql = require("mssql");
require("msnodesqlv8");

// const sql = require("mssql/msnodesqlv8");
// // require("msnodesqlv8");

const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  // driver: 'msnodesqlv8',
  //connectionTimeout: 1500000,
  options: {
    //encrypt: true,
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
  db_answer = await execQuery(`select top 5 user_id from panel where pol_affl = ${score}  order by newid()`);
  console.log(db_answer);
  return db_answer;
}

async function getUserFreinds(user_id) {
  let db_answer = await execQuery(`select top 5 friend_uid from friendships where panel_uid  ='${user_id}' and has_tweets = 1 order by newid()`);
  return db_answer;
}

// order tweet date from the newest to the oldest
async function getUserTweetsIds(user_id) {
  let db_answer = await execQuery(`SELECT top 10 friend_tweetList.tweet_id 
  FROM friend_tweetList
  INNER JOIN friendships 
  ON friend_tweetList.user_id=friendships.friend_uid
  Where friendships.panel_uid  ='${user_id}'
  order by newid()`);
  return db_answer;
}


async function getUsersFriendsByFilters(age, country, party, gender, race) {
  let sql_age = "'" + age + "'";
  let sql_country = "'" + country + "'";
  let sql_party = "'" + party + "'";
  let sql_gender = "'" + gender + "'";
  let sql_race = "'" + race + "'";
  // let sql_age = age
  // let sql_country = country
  // let sql_party = party
  // let sql_gender = gender
  // let sql_race = race

  if (age === "age") {
    sql_age = "age";
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
  let db_answer = await execQuery("SELECT top 20 friend_tweetList.tweet_id FROM friend_tweetList INNER JOIN (select distinct friend_uid from friendships where age  = " +
    sql_age +
    " and state_code  = " + sql_country +
    " and party  = " + sql_party +
    " and sex  = " + sql_gender +
    " and race_ethnicity  = " + sql_race +
    " and has_tweets = 1) as r ON friend_tweetList.user_id= r.friend_uid"
  );
  return db_answer;
}


// select all the ages from the friendships table
async function getAllAges() {
  let db_answer = await execQuery("select distinct age from friendships order by age ASC");
  return db_answer;
}

// select all the countries from the friendships table
async function getAllCountries() {
  let db_answer = await execQuery(
    "select distinct state_code from friendships"
  );
  return db_answer;
}

// select all the parties from the friendships table
async function getAllParties() {
  let db_answer = await execQuery("select distinct party from friendships");
  return db_answer;
}

// select all the genders from the friendships table
async function getAllGenders() {
  let db_answer = await execQuery("select distinct sex from friendships");
  return db_answer;
}

// select all the races from the friendships table
async function getAllRaces() {
  let db_answer = await execQuery(
    "select distinct race_ethnicity from friendships"
  );
  return db_answer;
}


module.exports = {
  execQuery: execQuery,
  getUsersByScore: getUsersByScore,
  getUserFreinds: getUserFreinds,
  getUserTweetsIds: getUserTweetsIds,
  getUsersFriendsByFilters: getUsersFriendsByFilters,
  getAllAges: getAllAges,
  getAllCountries: getAllCountries,
  getAllParties: getAllParties,
  getAllGenders: getAllGenders,
  getAllRaces: getAllRaces,
};
