<template>
  <div class="md:w-full h-full">
    <div
      style="
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: white;
      "
    >
      <!-- Population title -->
      <div
        class="px-5 py-3 border-b border-lighter flex items-center justify-between"
      >
        <h1 class="text-xl font-bold">Population</h1>
        <i class="fas fa-globe-europe text-xl text-blue"></i>
      </div>
      <!-- Filters for Population's Segmentation.	
           The filters are: age, country, party, gender and race -->
      <div style="margin-bottom: 1px">Please Choose Your Filters:</div>
      <div>
        <b-form-select
          class="mb-2"
          style="
            border: 2px solid #ced4da;
            width: 31%;
            margin-top: 1px;
            margin-bottom: 1px;
            margin-right: 10px;
          "
          v-model="age"
          :options="op_age"
        ></b-form-select>
        <b-form-select
          class="mb-2"
          style="
            border: 2px solid #ced4da;
            width: 31%;
            margin-top: 1px;
            margin-bottom: 1px;
            margin-right: 10px;
          "
          v-model="country"
          :options="op_country"
        ></b-form-select>
        <b-form-select
          class="mb-2"
          style="
            border: 2px solid #ced4da;
            width: 31%;
            margin-top: 1px;
            margin-right: 10px;
          "
          v-model="party"
          :options="op_party"
        ></b-form-select>
        <b-form-select
          class="mb-2"
          style="
            border: 2px solid #ced4da;
            width: 31%;
            margin-top: 1px;
            margin-right: 10px;
          "
          v-model="gender"
          :options="op_gender"
        ></b-form-select>
        <b-form-select
          class="mb-2"
          style="
            border: 2px solid #ced4da;
            width: 31%;
            margin-top: 1px;
            margin-right: 10px;
          "
          v-model="race"
          :options="op_race"
        ></b-form-select>
      </div>
<!-- Buttons for search and reset  -->
      <div>
        <button
          type="submit"
          class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
          @click="search()"
          style="position: relative; left: 62%"
        >
          Search
        </button>

        <button
          type="submit"
          class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
          @click="set_reset()"
          style="position: relative; left: 65%"
        >
          Reset
        </button>
        <div class="px-5 py-1 border-b border-lighter"></div>
      </div>
    </div>

    <!-- Feed tweets: show the tweets that returns from the backend -->
    <div v-if="this.error_message.length != 0">
      <p class="px-5 py-6 border-b border-lighter" style="margin-top: 15px">
        {{ this.error_message }}
      </p>
    </div>

    <div v-if="this.load === true">
      <div class="text-center" style="margin-top: 50px">
        <div
          class="spinner-border text-primary"
          style="width: 80px; height: 80px"
          role="status"
        ></div>
      </div>
    </div>
    <!-- <div v-else>
      <p
        class="px-5 py-6 border-b border-lighter"
        style="margin-top: 15px"
        v-for="tweet in this.feed"
        :key="tweet"
      >
        {{ tweet }}
        
      </p>  -->
      <div id="feed"></div>  
    <!-- </div> -->
    
  </div>
</template>
<script>
import axios from "axios";
import options_countries from "../assets/countries";
import options_ages from "../assets/ages";
import options_parties from "../assets/parties";
import options_genders from "../assets/genders";
import options_races from "../assets/races";

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
export default {
  name: "Population",
  components: {},
  data: function () {
    return {
      load: false,
      feed: "",
      error_message: "",
      age: "age_bucket",
      country: "country",
      party: "party",
      gender: "gender",
      race: "race",
      op_age: options_ages,
      op_country: options_countries,
      op_gender: options_genders,
      op_party: options_parties,
      op_race: options_races,
    };
  },
  methods: {
    /**
    * clear the feed and filters
    */
    set_reset() {
      this.load = false;
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
      
    },

    /**
     * send Get request to the backend with the parameters from the filters.
     * get the response from the backend and set the data to the feed varible 
     */
    async search() {
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
    },
  },
};
</script>

<style>
</style>