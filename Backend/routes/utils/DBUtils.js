require("dotenv").config();
const sql = require("mssql");
require("msnodesqlv8");

// const sql = require("mssql/msnodesqlv8");

const config = {
    user: process.env.tedious_userName,
    password: process.env.tedious_password,
    server: process.env.tedious_server,
    database: process.env.tedious_database,
    driver: 'msnodesqlv8',    
    connectionTimeout: 1500000,
    options: {
      encrypt: true,
      enableArithAbort: true,
      trustedConnection: true

    }
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
};

execQuery().catch((error) => console.log(`Error in executing ${error}`));


// =============== Queries ===============

// async function cheekUserIDinDB(user_id){
//     let db_answer = await execQuery("select * from users where user_id = '"+user_id+"'");
//     return db_answer;
// }

async function getUsersByScore(score){
  console.log(score)
  let db_answer =[]
  db_answer = await execQuery(`select user_id from panel where pol_affl = 0`);
  console.log(db_answer)
  return db_answer;
}

async function getUserFreinds(user_id){
  let db_answer = await execQuery("select friend_uid from friendships where panel_uid  = '"+user_id+"'");
  return db_answer;
}

// order tweet date from the newest to the oldest
async function getUserTweetsIds(user_id){
  let db_answer = await execQuery("select tweet_id from urls where user_id  = '"+user_id+"' ORDER BY tweet_date ASC");
  return db_answer;
}


// exports.cheekUserIDinDB = cheekUserIDinDB;
exports.getUsersByScore = getUsersByScore;
exports.getUserFreinds = getUserFreinds;
exports.getUserTweetsIds = getUserTweetsIds;

