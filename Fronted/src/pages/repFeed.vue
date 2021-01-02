<template>
  <div class="md:w-full h-full">
    <div
      class="px-5 py-3 border-b border-lighter flex items-center justify-between"
    >
      <h1 class="text-xl font-bold">Repfeed</h1>
      <i class="fas fa-balance-scale text-xl text-blue"></i>
    </div>
    <VueSlideBar
      v-model="slider.value"
      :data="slider.data"
      @dragEnd="update_value"
      @callbackRange="callbackRange"
    />

    <button
      submit
      class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
      @click="update_res()"
      style="position: relative; left: 80%; top: 15px"
    >
      Reset
    </button>
    <hr style="position: relative; top: 20px" />

    <!-- feed tweet -->
    <div>
      <p>{{this.feed}}</p>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      feed: "",
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
    update_res() {
      const res = axios.get("http://localhost:3000/repfeed/reset");
      console.log(res);
      //   .then((res) => console.log(res))
      //   .catch()((error) => {
      //   this.errorMessage = error.message;
      //   console.error("There was an error!", error);
      // });
    },
    async update_value() {
      this.feed = ""

      try {
        console.log(this.slider.value);
        const response = await axios.get("http://localhost:3000/repfeed/" + this.slider.value);
        console.log(response.data);
        this.feed = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    callbackRange(val) {
      console.log(val);
      //this.sliderWithLabel.rangeValue = val;
      this.slider.value = val;
      // console.log(this.value);
    },

    //  async reset(){
    //       const response = await this.axios.get("http://localhost:3000/repfeed")
    //       .then(response => console.log(response))
    //       .catch() (error => {

    //       }),

    // },
    //  async reset_b(){

    //       console.log("reset");
    //       this.reset();
    //       console.log("Worked");
    // },

    //example from Doron
    // async update_value(){
    // const response = await this.axios.get(
    //       "http://localhost:3000/recipes/search/query/" +
    //         this.search_query +
    //         "/amount/" +
    //         this.num +
    //         "?" +
    //         filters
    //     );
    // },
  },
};
</script>

<style>
</style>


