
// import options_countries from "./assets/countries";
// import options_ages from "./assets/ages";
// import options_parties from "./assets/parties";
// import options_genders from "./assets/genders";
// import options_races from "./assets/races";

function age_load(){
   
    var ages = [{ value: "age_bucket", text: "Age"},
    { value: "18-24", text: "18-24"},
    { value: "25-34", text: "25-34"},
    { value: "35-49", text: "35-49"},
    { value: "50-64", text: "50-64"},
    { value: "65+", text: "65+"}]

    var elm = document.getElementById('age'); // get the select
    for(i in ages){
        var option = document.createElement('option'); // create the option element
        option.value = i.value; // set the value property
        option.appendChild(document.createTextNode(i.text)); // set the textContent in a safe way.
        elm.append(option);
        
    }
   
}

age_load();

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

const url = "https://icc.ise.bgu.ac.il/RepFeed/population/";
// export default {
//   name: "Population",
  
//   components: {},
//   data: function () {
    // return {
    var  load = false;
    var  feed = "";
    var  error_message = "";
    var  age = "age_bucket";
    var  country = "country";
    var  party = "party";
    var  gender = "gender";
    var  race = "race";
    //   op_age= options_ages,
    //   op_country= options_countries,
    //   op_gender= options_genders,
    //   op_party= options_parties,
    //   op_race= options_races,
    // };
    
//   },
//   methods: {
    /**
    * clear the feed and filters
    */
    function set_reset() {
      this.load = false;
      console.log("hiiii");
      document.getElementById('feed').innerHTML = "";
      try {
        (this.age = "age_bucket"),
        (this.country = "country"),
        (this.party = "party"),
        (this.gender = "gender"),
        (this.race = "race"),
        (this.feed = "");
        this.error_message = "";
        
      } catch (error) {
        console.log(error);
      }
      
    }

    /**
     * send Get request to the backend with the parameters from the filters.
     * get the response from the backend and set the data to the feed varible 
     */
    async function search() {
      this.load = true;
      this.feed = "";
      this.error_message = "";
      document.getElementById('feed').innerHTML = "";
      //document.getElementById('feed').style.visibility = "hidden"
      // send Get request 
      try {
        const response = await axios.get(
          url + `${this.age}/${this.country}/${this.party}/${this.gender}/${this.race}`
        );
        // if the backend returns empty list, set an error message
        if (response.data.length != 0) {
          for (let tweet in response.data){
            console.log(tweet)
            window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
          }
          this.feed = response.data;
        } 
        else {
          this.error_message = "Sorry no result for your request";
        }
        //document.getElementById('else').style.visibility = "visible";
        this.load = false;
      } catch (error) {
        console.log(error);
      }
     }
    //  ,
//   },
// }
// ;