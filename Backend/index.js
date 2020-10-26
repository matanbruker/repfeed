require("dotenv").config();

//libraries importing

//express: is for uploading the server
const express = require("express");

//bodyParser: parse the requests
const bodyParser = require("body-parser");

//morgan: logger
const morgan = require("morgan");

//session: authentication
const session = require("client-sessions");

const path = require("path");
const cors = require("cors");




//routes importing
//const auth = require("./routes/auth");
const user = require("./routes/user");
const tweet = require("./routes/tweet");


//app settings
const app = express();
const port =  process.env.PORT || "3000";

//parse application/x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json());

//print request logs
app.use(morgan(":method : url :status :response-time ms"));

//setting cors
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));


//settings cookies configuration
app.use(
    session({
        cookieName: "session", // the cookie key name
        secret: process.env.COOKIE_SECRET, // the encryption key
        duration: 20* 60 * 1000, // expired after 20 sec
        activeDuration: 0, // if expiresIn < activeDuration,
        //the session will be extended by activeDuration milliseconds
        cookie:{
          httpOnly: false
        }
      })
);

app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

//check if the server is alive
app.get("/alive", (req, res) => {
    res.send("I'm alive");
});


//routing
app.use("/user",user);
app.use("/tweet",tweet);
//app.use(auth);

//default router
app.use((req, res) => {
    res.sendStatus(404);
});

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}!`);
// });

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send({ message: err.message, success: false });
  });
  
  const server = app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
  });
  
  process.on("SIGINT", function () {
    if (server) {
      server.close(() => console.log("server closed"));
    }
    process.exit();
  });
  
