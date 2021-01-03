require("dotenv").config();
const sql = require("mssql");
// const sql = require("mysql");
require("msnodesqlv8");

// const sql = require("mssql/msnodesqlv8");

const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  // port: 1433,
  driver: "msnodesqlv8",
  // connectionTimeout: 1500000,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustedConnection: true,
  },
};

// const sql = require("mssql");

// const config = {
//   user: process.env.tedious_userName,
//   password: process.env.tedious_password,
//   server: process.env.tedious_server,
//   database: process.env.tedious_database,
//   // connectionTimeout: 1500000,
//   options: {
//     encrypt: true,
//     enableArithAbort: true
//   }
// };

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
}

execQuery().catch((error) => console.log(`Error in executing ${error}`));

// =============== Queries ===============

// async function cheekUserIDinDB(user_id){
//     let db_answer = await execQuery("select * from users where user_id = '"+user_id+"'");
//     return db_answer;
// }

async function getUsersByScore(score) {
  console.log(score);
  let db_answer = [];
  db_answer = await execQuery(
    `select user_id from panel where pol_affl = ${score}`
  );
  console.log(db_answer);
  return db_answer;
}

async function getUserFreinds(user_id) {
  let db_answer = await execQuery(
    `select friend_uid from friendships where panel_uid  ='${user_id}'`
  );
  return db_answer;
}

// order tweet date from the newest to the oldest
async function getUserTweetsIds(user_id) {
  let db_answer = await execQuery(
    `select tweet_id from urls where user_id ='${user_id}' ORDER BY tweet_date ASC`
  );
  return db_answer;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getUsersFriendsByFilters(age, country, party, gender, race) {
  let sql_age = "'" + age + "'";
  let sql_country = "'" + country + "'";
  let sql_party = "'" + party + "'";
  let sql_gender = "'" + gender + "'";
  let sql_race = "'" + race + "'";

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

  let db_answer = await execQuery(
    "select distinct friend_uid from friendships where age  = " +
      sql_age +
      " and state_code  = " +
      sql_country +
      " and party  = " +
      sql_party +
      " and sex  = " +
      sql_gender +
      " and race_ethnicity  = " +
      sql_race + 
      "and has_tweets = 1"
  );
  return db_answer;
}

// select all the ages from the friendships table
async function getAllAges() {
  let db_answer = await execQuery("select distinct age from friendships");
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

// exports.cheekUserIDinDB = cheekUserIDinDB;
// exports.getUsersByScore = getUsersByScore;
// exports.getUserFreinds = getUserFreinds;
// exports.getUserTweetsIds = getUserTweetsIds;

module.exports = {
  execQuery: execQuery,
  getUsersByScore: getUsersByScore,
  getUserFreinds: getUserFreinds,
  getUserTweetsIds: getUserTweetsIds,

  ////////////////////////////////////////////////////////////////////////////////////////
  getUsersFriendsByFilters: getUsersFriendsByFilters,
  getAllAges: getAllAges,
  getAllCountries: getAllCountries,
  getAllParties: getAllParties,
  getAllGenders: getAllGenders,
  getAllRaces: getAllRaces,
};
