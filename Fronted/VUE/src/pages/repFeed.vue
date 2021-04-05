<template>
  <div class="md:w-full h-full" >
    <div  style="position: -webkit-sticky;position: sticky;top:0;background-color:white;">
      <!-- Repfeed title -->
      <div
        class="px-5 py-3 border-b border-lighter flex items-center justify-between"
      >
        <h1 class="text-xl font-bold">RepFeed</h1>
        <i class="fas fa-balance-scale text-xl text-blue"></i>
      </div>
      <!-- slide bar -->
      <div class="px-1">
        <VueSlideBar
          v-model="slider.value"
          :data="slider.data"
          @dragEnd="update_value"
          @callbackRange="callbackRange"
        />
      </div>
      <!-- reset button -->
      <div
        class="px-5 py-6 border-b border-lighter flex items-center justify-between"
      >
        <button
          submit
          class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
          @click="update_res()"
          style="position: relative; left: 80%; top: 15px"
        >
          Reset
        </button>
      </div>
    </div>
    <!-- feed tweet -->
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
const url = "https://icc.ise.bgu.ac.il/RepFeed/repfeed/";

export default {
  name: "repFeed",
  data() {
    return {
      load: false,
      feed: "",
      error_message: "",
      slider: {
        value: 0,
        data: [
          -1,
          -0.9,
          -0.8,
          -0.7,
          -0.6,
          -0.5,
          -0.4,
          -0.3,
          -0.2,
          -0.1,
          0,
          0.1,
          0.2,
          0.3,
          0.4,
          0.5,
          0.6,
          0.7,
          0.8,
          0.9,
          1,
        ],
      },
    };
  },
  methods: {
    async update_res() {
      this.load = true;
      this.feed = "";
      document.getElementById('feed').innerHTML = "";
      //document.getElementById('feed').style.visibility = "hidden"
      this.error_message = "";
      // send Get request 
      try {
        this.slider.value = 0;
        const response = await axios.get(url + "reset");

        // if the backend returns empty list, set an error message
        if (response.data.length != 0) {
          for (let tweet in response.data){
            console.log(tweet)
            window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
          }
          this.feed = response.data;
        } else {
          this.error_message = "Sorry no result for your request";
        }

        //document.getElementById('feed').style.visibility = "visible";
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },

    async update_value() {
      this.load = true;
      document.getElementById('feed').innerHTML = "";
      //document.getElementById('feed').style.visibility = "hidden"
      // send Get request 
      try {
        this.feed = "";
        this.error_message = "";
        console.log(this.slider.value);
        const response = await axios.get(
          url + this.slider.value
        );

        // if the backend returns empty list, set an error message
        if (response.data.length != 0) {
          for (let tweet in response.data){
            console.log(tweet)
            window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
          }
          this.feed = response.data;
        } else {
          this.error_message = "Sorry no result for your request";
        }

        //document.getElementById('feed').style.visibility = "visible";
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
    callbackRange(val) {
      console.log(val);
      this.slider.value = val;
    },
  },
};
</script>
<style>
</style> 


