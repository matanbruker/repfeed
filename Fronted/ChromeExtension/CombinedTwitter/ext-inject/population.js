const url = "https://rps.ise.bgu.ac.il/RepFeed/population/";
let tweets_array;
let counter = 0;
let start_inx = 0;

// load age filter values
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
    if(elm != null){  
      elm.append(option);
    }     
  }
}
  // load country filter values
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
      if(elm != null){
        elm.append(option);
      }
    }
  }

  // load gender filter values
  function gender_load(){
    var genders = [{value: "gender", text: "Gender"},
    {value: "Female", text: "Female"},
    {value: "Male", text: "Male"}]
  
    var elm = document.getElementById('gender'); // get the select
    for(i=0; i< genders.length;  i++){ 
      var option = document.createElement('option'); // create the option element
      option.value = genders[i].value; // set the value property
      option.appendChild(document.createTextNode(genders[i].text)); // set the textContent in a safe way.
      if(elm != null){
        elm.append(option);
      }     
    } 
  }

  // load party filter values
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
      if(elm != null){
        elm.append(option);
      }     
    }
  }

  // load race filter values
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
      if(elm != null){
        elm.append(option);
      }
    }
  }

  // this function display tweets in the twitter format using twitter api
  function more_tweets(start_inx=0){
    for (tweet=start_inx; tweet<start_inx+10; tweet++){
      if(tweet == tweets_array.length-1){
          return 
      }

      if(tweets_array[tweet].includes('[')){
        tweets_array[tweet] = tweets_array[tweet].replace('[', '');
      }

      if(tweets_array[tweet].includes(']')){
        tweets_array[tweet] = tweets_array[tweet].replace(']', '');
      }

      tweets_array[tweet] = tweets_array[tweet].replace('"', '');
      tweets_array[tweet] = tweets_array[tweet].replace('"', '');
      
      var blockquote = document.createElement("blockquote");
      blockquote.setAttribute("class", "twitter-tweet");
      var a = document.createElement("a");
      a.setAttribute("href", "https://twitter.com/x/status/" + tweets_array[tweet]);
      blockquote.append(a);
      var script = document.createElement("script");
      script.async = true;
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("charset", "utf-8");
      feed = document.getElementById('feed')
      feed.appendChild(blockquote);
      feed.appendChild(script);
    }

    start_inx = start_inx + 10;
    setTimeout(function(){
      counter = counter + 10;
      if(counter < 40){
        more_tweets(start_inx);
      }
    }, 5000);
  }

/**
  * send Get request to the backend with the parameters from the filters.
  * get the response from the backend and set the data to the feed varible 
*/
async function search() {
  // check if error message is shown and remove it
  if(document.getElementById('error_message')) {
    document.getElementById('error_message').remove();
  }

  counter = 0;
  create_spinner();
  this.error_message = "";
  document.getElementById('feed').innerHTML = "";

  // send Get request 
  const response = await fetch(
    url + (document.getElementById('age')).value +'/'+(document.getElementById('country')).value +'/'+ (document.getElementById('party')).value + '/' +(document.getElementById('gender')).value +'/'+ (document.getElementById('race')).value,{
      method: 'GET',
      // mode: 'no-cors'
    })
  .then(response => response.text())
  .then((response) => {
    // if the backend returns empty list, set an error message
    if (response.length != 2) {//the lengh is 2 because it is the length of empty arry
      // clean respond
      tweets_array = response.split(",");
      more_tweets(); 
    }
    else {
        create_error_message();
    }

    // stop spinner
    document.getElementById('spinner').remove();
  })
  .catch ((error) => {
    console.log(error);
  })
}
  
/**
  * clear the feed and filters of population page
*/
function set_reset() {
  //check if error message or spinner are shown and remove them
  if(document.getElementById('error_message')) {
    document.getElementById('error_message').remove();
  }

  if(document.getElementById('spinner')) {
    document.getElementById('spinner').remove();
  }

  //cleen feed and reset filters to default values
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

// display the spinner
function create_spinner() {
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
}

// display error message
function create_error_message() {
  this.error_message = "Sorry! No result for your request";
  container_error = document.createElement('div');
  container_error.setAttribute("id", "error_message");
  text = document.createElement('p');
  text.setAttribute("class", "px-5 py-6 border-b border-lighter");
  text.setAttribute("style", "margin-top: 15px; font-weight:bold; text-align: center;");
  text.setAttribute("id", "error_message_txt");
  text.setAttribute("id", "error_message_txt");
  text.textContent = error_message;
  container_error.append(text);
  document.getElementById('feed').append(container_error);
}

search_btn = document.getElementById("search").addEventListener("click", search);
reset_btn = document.getElementById("reset").addEventListener("click", set_reset);
age_load();
country_load();
gender_load();
party_load();
race_load();