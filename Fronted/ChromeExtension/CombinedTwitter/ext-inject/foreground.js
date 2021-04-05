var  load = false;
var  feed = "";
var  error_message = "";

function insertButton(name, command) {
  button = document.createElement('button');
  button.append(name);
  button.setAttribute("class", "focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3");
  
  button.onclick = function() {
    chrome.extension.sendRequest({cmd: command}, function(html){
      page = document.querySelector('.css-1dbjc4n.r-14lw9ot.r-1gm7m50.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-13qz1uu.r-184en5c');
      page.innerHTML = html;
      
   if(name == "population"){
    age_load();
    country_load();
    gender_load();
    party_load();
    race_load();
    reset_btn = document.getElementById("reset").addEventListener("click", set_reset);
    search_btn = document.getElementById("search").addEventListener("click", search);
    // error_message_div = document.getElementById("error_message").style.visibility = "hidden";
    // error_message_txt = document.getElementById("error_message_txt");
    // error_message_txt.textContent = error_message;
    //spinner = document.getElementById('spinner').style.visibility = "hidden";
   } 

   if(name == "repfeed"){
     slide = document.getElementById('slide').addEventListener("click", update_value);
     res_slide_btn = document.getElementById('res_slide').addEventListener("click", update_res)
    //  error_div = document.getElementById("error_div").style.visibility = "hidden";
    //  error_message_txt = document.getElementById("txt");
    //  error_message_txt.textContent = error_message;
     const range = document.getElementById('slide'), rangeV = document.getElementById('rangeV'),
     setValue = ()=>{
      const newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
        newPosition = 10 - (newValue * 0.2);
      rangeV.innerHTML = `<span>${range.value}</span>`;
      rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
     };
     setValue();
     document.addEventListener("DOMContentLoaded", setValue);
     range.addEventListener('input', setValue);
   }

     //spinner = document.getElementById('spinner').style.visibility = "hidden";
   //}

  });
  }

  document.querySelector('.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010')
  .querySelector('.css-1dbjc4n.r-obd0qt.r-16y2uox.r-lrvibr.r-1g40b8q')
  .querySelector('.css-1dbjc4n.r-aqfbo4.r-1pi2tsx.r-1xcajam.r-ipm5af')
  .querySelector('.css-1dbjc4n.r-1awozwy')
  .append(button);
}

insertButton("repfeed", "read_file_repfeed");
insertButton("population", "read_file_population");

const url = "https://icc.ise.bgu.ac.il/RepFeed/population/";
const repfeed_url = "https://icc.ise.bgu.ac.il/RepFeed/repfeed/";
const tweet_url = "https://twitter.com/Interior/status/";
const pre_url = "https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=";
const post_url ="&lang=en&origin=chrome-extension%3A%2F%2Fgmoaocclfjmbjochoekgalcdplokjfnh%2Ftab%2Ftab.html%23%2Fpopulation&theme=light&widgetsVersion=e1ffbdb%3A1614796141937&width=550px";
var  age = "age_bucket";
var  country = "country";
var  party = "party";
var  gender = "gender";
var  race = "race";

// file = document.createElement("script");
// file.id = "twitter-wjs";
// file.src = "./widgets.js";
// file.charset = "utf-8";
// document.head.append(file);


// window.twttr = (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0],
//     t = window.twttr || {};
//   if (d.getElementById(id)) return t;
//   js = d.createElement(s);
//   js.id = id;
//   js.src = "./widgets.js";
//   console.log(js);
//   fjs.parentNode.insertBefore(js, fjs);
//   t._e = [];
//   t.ready = function(f) {
//     t._e.push(f);
//   };
//   t.widgets = {createTweet: };
//   console.log(t);
//   return t;
// }(document, "script", "twitter-wjs"));

function age_load(){
   
  var ages = [{ value: "age_bucket", text: "Age"},
  { value: "18-24", text: "18-24"},
  { value: "25-34", text: "25-34"},
  { value: "35-49", text: "35-49"},
  { value: "50-64", text: "50-64"},
  { value: "65+", text: "65+"}]

  var elm = document.getElementById('age'); // get the select
  for(i=0; i< ages.length;  i++){
    
    var option = document.createElement('option'); // create the option element
    option.value = ages[i].value; // set the value property
    option.appendChild(document.createTextNode(ages[i].text)); // set the textContent in a safe way.
    // console.log(option.text);
    if(elm != null){
      
      elm.append(option);
      // console.log("hi");
    }     
  } 
}

function country_load(){
   
  var countries = [ { value: "country", text: "State"},
  {value: "AK", text:"Alaska - AK"},
  {value: "AL", text:"Alabama - AL"},
  {value: "AR", text:"Arkansas - AR"},
  {value: "AZ", text:"Arizona - AZ"},
  {value: "CA", text:"California - CA"},
  {value: "CO", text:"Colorado - CO"},
  {value: "CT", text:"Connecticut - CT"},
  {value: "DC", text:"District of Columbia - DC"},
  {value: "DE", text:"Delaware - DE"},
  {value: "FL", text:"Florida - FL"},
  {value: "GA", text:"Georgia - GA"},
  {value: "HI", text:"Hawaii - HI"},
  {value: "IA", text:"Iowa - IA"},
  {value: "ID", text:"Idaho - ID"},
  {value: "IL", text:"Illinois - IL"},
  {value: "IN", text:"Indiana - IN"},
  {value: "KS", text:"Kansas - KS"},
  {value: "KY", text:"Kentucky - KY"},
  {value: "LA", text:"Louisiana - LA"},
  {value: "MA", text:"Massachusetts - MA"},
  {value: "MD", text:"Maryland - MD"},
  {value: "ME", text:"Maine - ME"},
  {value: "MI", text:"Michigan - MI"},
  {value: "MN", text:"Minnesota - MN"},
  {value: "MO", text:"Missouri - MO"},
  {value: "MS", text:"Mississippi - MS"},
  {value: "MT", text:"Montana - MT"},
  {value: "NC", text:"North Carolina - NC"},
  {value: "ND", text:"North Dakota - ND"},
  {value: "NE", text:"Nebraska - NE"},
  {value: "NH", text:"New Hampshire - NH"},
  {value: "NJ", text:"New Jersey - NJ"},
  {value: "NM", text:"New Mexico - NM"},
  {value: "NV", text:"Nevada - NV"},
  {value: "NY", text:"New York - NY"},
  {value: "OH", text:"Ohio - OH"},
  {value: "OK", text:"Oklahoma - OK"},
  {value: "OR", text:"Oregon - OR"},
  {value: "PA", text:"Pennsylvania - PA"},
  {value: "RI", text:"Rhode Island - RI"},
  {value: "SC", text:"South Carolina - SC"},
  {value: "SD", text:"South Dakota - SD"},
  {value: "TN", text:"Tennessee - TN"},
  {value: "TX", text:"Texas - TX"},
  {value: "UT", text:"Utah - UT"},
  {value: "VA", text:"Virginia - VA"},
  {value: "VT", text:"Vermont - VT"},
  {value: "WA", text:"Washington - WA"},
  {value: "WI", text:"West Virginia - WV"},
  {value: "WV", text:"Wisconsin - WI"},
  {value: "WY", text:"Wyoming - WY"}]

  var elm = document.getElementById('country'); // get the select
  for(i=0; i< countries.length;  i++){
    
    var option = document.createElement('option'); // create the option element
    option.value = countries[i].value; // set the value property
    option.appendChild(document.createTextNode(countries[i].text)); // set the textContent in a safe way.
    // console.log(option.text);
    if(elm != null){
      
      elm.append(option);
      // console.log("hi");
    }     
  } 
}

function gender_load(){
   
  var genders = [{value: "gender", text: "Gender"},
  {value: "Female", text: "Female"},
  {value: "Male", text: "Male"}]

  var elm = document.getElementById('gender'); // get the select
  for(i=0; i< genders.length;  i++){
    
    var option = document.createElement('option'); // create the option element
    option.value = genders[i].value; // set the value property
    option.appendChild(document.createTextNode(genders[i].text)); // set the textContent in a safe way.
    // console.log(option.text);
    if(elm != null){
      
      elm.append(option);
      // console.log("hi");
    }     
  } 
}

function party_load(){
   
  var parties = [{value: "party", text: "Party"},
  {value: "Democrat", text: "Democrat"},
  {value: "Independent", text: "Independent"},
  {value: "Republican", text: "Republican"},
  {value: "NA", text: "NA"}]

  var elm = document.getElementById('party'); // get the select
  for(i=0; i< parties.length;  i++){
    
    var option = document.createElement('option'); // create the option element
    option.value = parties[i].value; // set the value property
    option.appendChild(document.createTextNode(parties[i].text)); // set the textContent in a safe way.
    // console.log(option.text);
    if(elm != null){
      
      elm.append(option);
      // console.log("hi");
    }     
  } 
}

function race_load(){
   
  var races = [{value: "race", text: "Race"},
  {value: "African-American", text: "African-American"},
  {value: "Caucasian", text: "Caucasian"},
  {value: "Hispanic", text: "Hispanic"},
  {value: "Other", text: "Other"}]

  var elm = document.getElementById('race'); // get the select
  for(i=0; i< races.length;  i++){
    
    var option = document.createElement('option'); // create the option element
    option.value = races[i].value; // set the value property
    option.appendChild(document.createTextNode(races[i].text)); // set the textContent in a safe way.
    // console.log(option.text);
    if(elm != null){
      
      elm.append(option);
      // console.log("hi");
    }     
  } 
}

/**
  * clear the feed and filters
*/
function set_reset() {
    //this.load = false;
    if(document.getElementById('error_message')) {
      document.getElementById('error_message').remove();
    }
    if(document.getElementById('spinner')) {
      document.getElementById('spinner').remove();
    }
    //spinner = document.getElementById('spinner').style.visibility = "hidden";
    //console.log("reset");
    document.getElementById('feed').innerHTML = "";
    age = document.getElementById('age');
    age.value = 'age_bucket';
    country = document.getElementById('country');
    country.value = 'country';
    gender = document.getElementById('gender');
    gender.value = 'gender';
    party = document.getElementById('party');
    party.value = 'party';
    race = document.getElementById('race');
    race.value = 'race';
}

/**
  * send Get request to the backend with the parameters from the filters.
  * get the response from the backend and set the data to the feed varible 
*/
async function search() {
      //spinner = document.getElementById('spinner').style.visibility = "visible";
      if(document.getElementById('error_message')) {
        document.getElementById('error_message').remove();
      }

      container_div = document.createElement('div');
      container_div.setAttribute("id", "spinner");
      container_text = document.createElement('div');
      container_text.setAttribute("class", "text-center");
      container_text.setAttribute("style", "margin-top: 50px");
      spinner = document.createElement('div');
      spinner.setAttribute("class", "spinner-border text-primary");
      spinner.setAttribute("style", "width: 80px; height: 80px");
      spinner.setAttribute("role", "status");
      container_text.append(spinner);
      container_div.append(container_text);
      document.getElementById('page').append(container_div);

      this.feed = "";
      this.error_message = "";
      document.getElementById('feed').innerHTML = "";
      //document.getElementById('feed').style.visibility = "hidden"
      // send Get request 
      // try {}
        const response = await fetch(
          url + (document.getElementById('age')).value +'/'+(document.getElementById('country')).value +'/'+ (document.getElementById('party')).value + '/' +(document.getElementById('gender')).value +'/'+ (document.getElementById('race')).value,{
            method: 'GET',
            // mode: 'no-cors'
          })
        // if the backend returns empty list, set an error message
        .then(response => response.text())
        .then((response) => {
        // console.log(response.body);
         //console.log(response);
        if (response.length != 0) {
          tweets_array = response.split(",");
          //console.log(tweets_array);
           for (let tweet in tweets_array){
            if(tweets_array[tweet].includes('[')){
              tweets_array[tweet] = tweets_array[tweet].replace('[', '');
            }
            if(tweets_array[tweet].includes(']')){
              tweets_array[tweet] = tweets_array[tweet].replace(']', '');
            }
            tweets_array[tweet] = tweets_array[tweet].replace('"', '');
            tweets_array[tweet] = tweets_array[tweet].replace('"', '');
            // feed_tweets = document.getElementById("feed");
            // container = document.createElement("div");
            // container.setAttribute("class", "twitter-tweet twitter-tweet-rendered");
            // container.setAttribute("style", "display: flex; max-width: 550px; width: 100%; margin-top: 10px; margin-bottom: 10px;");
            // iframe = document.createElement("iframe");
            // iframe.setAttribute("id", "twitter-widget-0");
            // iframe.setAttribute("scrolling", "no");
            // iframe.setAttribute("frameborder", "0");
            // iframe.setAttribute("referrerpolicy", "unsafe-url");
            // iframe.setAttribute("allowtransparency", "true");
            // iframe.setAttribute("allowfullscreen", "true");
            // iframe.setAttribute("style", "position: static; visibility: visible; width: 276px; height: 227px; display: block; flex-grow: 1;");
            // iframe.setAttribute("title", "Twitter Tweet");
            // iframe.setAttribute("src", tweet_url + tweets_array[tw eet]);
            // iframe.setAttribute("data-tweet-id", tweets_array[tweet]);
            // container.append(iframe);
            feed_tweets = document.getElementById("feed");
            container = document.createElement("div");
            container.setAttribute("class", "twitter-tweet twitter-tweet-rendered");
            container.setAttribute("style", "display: flex; max-width: 600px; width: 100%; margin-top: 10px; margin-bottom: 10px;");
            iframe = document.createElement("iframe");
            iframe.setAttribute("id", "twitter-widget-0");
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowtransparency", "true");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute("style", "position: static; visibility: visible; width: 600px; height: 600px; display: block; flex-grow: 1;");
            iframe.setAttribute("title", "Twitter Tweet");
            iframe.setAttribute("src", pre_url + tweets_array[tweet] + post_url);
            iframe.setAttribute("data-tweet-id", tweets_array[tweet]);
            console.log(iframe);
            container.append(iframe);
            feed_tweets.append(container);
            //console.log(tweets_array[tweet]);
            // window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
            //console.log(window.twttr);
            //window.twttr.widgets.createTweet( tweets_array[tweet] , document.getElementById("feed"));
            //feed = feed + tweets_array[tweet] + "\n";
           }
          //document.getElementById('feed').innerHTML = feed;
        } 
        else {
          this.error_message = "Sorry no result for your request";
          container_error = document.createElement('div');
          container_error.setAttribute("id", "error_message");
          text = document.createElement('p');
          text.setAttribute("class", "px-5 py-6 border-b border-lighter");
          text.setAttribute("style", "margin-top: 15px");
          text.setAttribute("id", "error_message_txt");
          text.setAttribute("id", "error_message_txt");
          text.textContent = error_message;
          container_error.append(text);
          document.getElementById('page').append(container_error);
          // error_message_div = document.getElementById("error_message").style.visibility = "visible";
          // error_message_txt = document.getElementById("error_message_txt");
          // error_message_txt.textContent = error_message;
        }
        //document.getElementById('else').style.visibility = "visible";
        //this.load = false;
        // console.log(spinner);
        //spinner = document.getElementById('spinner').style.visibility = "hidden";
        container_div.remove();
      })
     
      .catch ((error) => {
        console.log(error);
      })
}

async function update_res() {
  //this.load = true;
  if(document.getElementById('error_message')) {
    document.getElementById('error_message').remove();
  }

  container_div = document.createElement('div');
  container_div.setAttribute("id", "spinner");
  container_text = document.createElement('div');
  container_text.setAttribute("class", "text-center");
  container_text.setAttribute("style", "margin-top: 50px");
  spinner = document.createElement('div');
  spinner.setAttribute("class", "spinner-border text-primary");
  spinner.setAttribute("style", "width: 80px; height: 80px");
  spinner.setAttribute("role", "status");
  container_text.append(spinner);
  container_div.append(container_text);
  document.getElementById('page').append(container_div);
  //spinner = document.getElementById('spinner').style.visibility = "visible";

  slide = document.getElementById('slide');
  this.feed = "";
  document.getElementById('feed').innerHTML = "";
  this.error_message = "";
  // send Get request 
  
    slide.value = 0;
    const range = document.getElementById('slide'), rangeV = document.getElementById('rangeV'),
    setValue = ()=>{
      const newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ), newPosition = 10 - (newValue * 0.2);
      rangeV.innerHTML = `<span>${range.value}</span>`;
      rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };
    setValue();

    const response = await fetch(repfeed_url + "reset", { method: 'GET',})
    .then(response => response.text())
    .then((response) => {
    // if the backend returns empty list, set an error message
    if (response.length != 0) {
      tweets_array = response.split(",");
      //console.log(tweets_array);
      for (let tweet in tweets_array){
        if(tweets_array[tweet].includes('[')){
          tweets_array[tweet] = tweets_array[tweet].replace('[', '');
        }
        if(tweets_array[tweet].includes(']')){
          tweets_array[tweet] = tweets_array[tweet].replace(']', '');
        }
        tweets_array[tweet] = tweets_array[tweet].replace('"', '');
        tweets_array[tweet] = tweets_array[tweet].replace('"', '');

        feed_tweets = document.getElementById("feed");
        container = document.createElement("div");
        container.setAttribute("class", "twitter-tweet twitter-tweet-rendered");
        container.setAttribute("style", "display: flex; max-width: 600px; width: 100%; margin-top: 10px; margin-bottom: 10px;");
        iframe = document.createElement("iframe");
        iframe.setAttribute("id", "twitter-widget-0");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowtransparency", "true");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("style", "position: static; visibility: visible; width: 600px; height: 600px; display: block; flex-grow: 1;");
        iframe.setAttribute("title", "Twitter Tweet");
        iframe.setAttribute("src", pre_url + tweets_array[tweet] + post_url);
        iframe.setAttribute("data-tweet-id", tweets_array[tweet]);
        console.log(iframe);
        container.append(iframe);
        feed_tweets.append(container);
        // console.log(tweets_array[tweet]);
        // window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
        //feed = feed + tweets_array[tweet] + "\n";
      }
      //document.getElementById('feed').innerHTML = feed;
    } else {
        this.error_message = "Sorry no result for your request";
        container_error = document.createElement('div');
        container_error.setAttribute("id", "error_message");
        text = document.createElement('p');
        text.setAttribute("class", "px-5 py-6 border-b border-lighter");
        text.setAttribute("style", "margin-top: 15px");
        text.setAttribute("id", "error_message_txt");
        text.setAttribute("id", "error_message_txt");
        text.textContent = error_message;
        container_error.append(text);
        document.getElementById('page').append(container_error);
        // error_div = document.getElementById("error_div").style.visibility = "visible";
        // error_message_txt = document.getElementById("txt");
        // error_message_txt.textContent = error_message;
    }

    //this.load = false;
    //spinner = document.getElementById('spinner').style.visibility = "hidden";
    container_div.remove();
  })
   .catch ((error) => {
    console.log(error);
  })
}

async function update_value() {
  if(document.getElementById('error_message')) {
    document.getElementById('error_message').remove();
  }
  //this.load = true;
  //spinner = document.getElementById('spinner').style.visibility = "visible";
  container_div = document.createElement('div');
  container_div.setAttribute("id", "spinner");
  container_text = document.createElement('div');
  container_text.setAttribute("class", "text-center");
  container_text.setAttribute("style", "margin-top: 50px");
  spinner = document.createElement('div');
  spinner.setAttribute("class", "spinner-border text-primary");
  spinner.setAttribute("style", "width: 80px; height: 80px");
  spinner.setAttribute("role", "status");
  container_text.append(spinner);
  container_div.append(container_text);
  document.getElementById('page').append(container_div);

  document.getElementById('feed').innerHTML = "";
  slide = document.getElementById('slide');
  // send Get request 
  
    this.feed = "";
    this.error_message = "";
    //console.log(slide.value);
    const response = await fetch(repfeed_url + slide.value, {method: 'GET',})

    .then(response => response.text())
    .then((response) => {
    // if the backend returns empty list, set an error message
    if (response.length != 0) {
      tweets_array = response.split(",");
      //console.log(tweets_array);
      for (let tweet in tweets_array){
        if(tweets_array[tweet].includes('[')){
          tweets_array[tweet] = tweets_array[tweet].replace('[', '');
        }
        if(tweets_array[tweet].includes(']')){
          tweets_array[tweet] = tweets_array[tweet].replace(']', '');
        }
        tweets_array[tweet] = tweets_array[tweet].replace('"', '');
        tweets_array[tweet] = tweets_array[tweet].replace('"', '');

        feed_tweets = document.getElementById("feed");
        container = document.createElement("div");
        container.setAttribute("class", "twitter-tweet twitter-tweet-rendered");
        container.setAttribute("style", "display: flex; max-width: 600px; width: 100%; margin-top: 10px; margin-bottom: 10px;");
        iframe = document.createElement("iframe");
        iframe.setAttribute("id", "twitter-widget-0");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowtransparency", "true");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("style", "position: static; visibility: visible; width: 600px; height: 600px; display: block; flex-grow: 1;");
        iframe.setAttribute("title", "Twitter Tweet");
        iframe.setAttribute("src", pre_url + tweets_array[tweet] + post_url);
        iframe.setAttribute("data-tweet-id", tweets_array[tweet]);
        console.log(iframe);
        container.append(iframe);
        feed_tweets.append(container);
        // console.log(tweets_array[tweet]);
        // window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
        //feed = feed + tweets_array[tweet] + "\n";
      }
      //document.getElementById('feed').innerHTML = feed;
    }  else {
      this.error_message = "Sorry no result for your request";
      container_error = document.createElement('div');
      container_error.setAttribute("id", "error_message");
      text = document.createElement('p');
      text.setAttribute("class", "px-5 py-6 border-b border-lighter");
      text.setAttribute("style", "margin-top: 15px");
      text.setAttribute("id", "error_message_txt");
      text.setAttribute("id", "error_message_txt");
      text.textContent = error_message;
      container_error.append(text);
      document.getElementById('page').append(container_error);
      // error_div = document.getElementById("error_div").style.visibility = "visible";
      // error_message_txt = document.getElementById("txt");
      // error_message_txt.textContent = error_message;
    }

    //this.load = false;
    //spinner = document.getElementById('spinner').style.visibility = "hidden";
    container_div.remove();
  }) 
  .catch ((error) => {
    console.log(error);
  })
}