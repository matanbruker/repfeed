<template>
  <div class="md:w-full h-full">
    <!-- title -->
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
    <div v-else>
      <p
        class="px-5 py-6 border-b border-lighter"
        style="margin-top: 15px"
        v-for="tweet in this.feed"
        :key="tweet"
      >
        {{ tweet }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
      this.error_message = "";
      try {
        this.slider.value = 0;
        const response = await axios.get("http://localhost:3000/repfeed/reset");
        //console.log(response);
        if (response.data.length != 0) {
          this.feed = response.data;
        } else {
          this.error_message = "Sorry no result for your request";
        }
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
    async update_value() {
      this.load = true;
      try {
        this.feed = "";
        this.error_message = "";
        console.log(this.slider.value);
        const response = await axios.get(
          "http://localhost:3000/repfeed/" + this.slider.value
        );
        //console.log(response.data);
        if (response.data.length != 0) {
          this.feed = response.data;
        } else {
          this.error_message = "Sorry no result for your request";
        }
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


