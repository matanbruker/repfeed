require("dotenv").config();
const sql = require("mssql");

const config = {
    user: process.env.tedious_userName,
    password: process.env.tedious_password,
    server: process.env.tedious_server,
    database: process.env.tedious_database,
    // connectionTimeout: 1500000,
    options: {
      encrypt: true,
      enableArithAbort: true
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

async function cheekUserIDinDB(user_id){
    let db_answer = await execQuery("select * from users where user_id = '"+user_id+"'");
    return db_answer;
}

exports.cheekUserIDinDB = cheekUserIDinDB;
