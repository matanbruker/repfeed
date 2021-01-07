<template>
  <div class="md:w-full h-full">
    <!-- title -->
    <div
      class="px-5 py-3 border-b border-lighter flex items-center justify-between "
    >
      <h1 class="text-xl font-bold">Population</h1>
      <i class="fas fa-globe-europe text-xl text-blue"></i>
    </div>
    <!-- selections -->
    <div class="mt-3">Please Choose Your Filters:</div>
    <div>
    <b-form-select class="mb-3" style="border: 2px solid #ced4da; width:40%; margin-top: 10px;margin-bottom: 10px;margin-right: 50px;padding: 3px 3px 3px 3px;" v-model="age" :options="op_age"></b-form-select>
    <b-form-select class="mb-3" style="border: 2px solid #ced4da; width:40%; margin-top: 10px;margin-bottom: 10px;margin-right: 50px;padding: 3px 3px 3px 3px;" v-model="country" :options="op_country"></b-form-select>
    <b-form-select class="mb-3" style="border: 2px solid #ced4da; width:40%; margin-top: 10px;margin-bottom: 10px;margin-right: 50px;padding: 3px 3px 3px 3px;" v-model="party" :options="op_party"></b-form-select>
    <b-form-select class="mb-3" style="border: 2px solid #ced4da; width:40%; margin-top: 10px;margin-bottom: 10px;margin-right: 50px;padding: 3px 3px 3px 3px;" v-model="gender" :options="op_gender"></b-form-select>
    <b-form-select class="mb-3" style="border: 2px solid #ced4da; width:40%; margin-top: 10px;margin-bottom: 10px;margin-right: 50px;padding: 3px 3px 3px 3px;" v-model="race" :options="op_race"></b-form-select>
    </div>

    <div class="px-5 py-3 border-b border-lighter">
      <button
        type="submit"
        class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
        @click="search()"
        style="position: relative; left: 62%;"
      >
        Search
      </button>

      <button
        type="submit"
        class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0"
        @click="set_reset()"
        style="position: relative; left: 65%;"
      >
        Reset
      </button>
    </div>
    
    <!-- feed tweet -->
    <div v-if="this.error_message.length != 0">
      <p class="px-5 py-6 border-b border-lighter" style="margin-top: 15px;">{{this.error_message}}</p>
    </div>
    <div v-if="this.load === true">
      <div class="text-center" style="margin-top: 50px">
        <div class="spinner-border text-primary" style="width: 80px; height: 80px;" role="status">
        </div>
      </div>
    </div>
    <div v-else>
      <!-- <div v-if="this.load">
        <div class="loader"></div>
      </div> -->
      <p class="px-5 py-6 border-b border-lighter" style="margin-top: 15px;" v-for="tweet in this.feed" :key="tweet">{{tweet}}</p>
    </div>
     
  </div>
</template>

<script>
import axios from "axios";
import options_countries from "../assets/countries";
import options_ages from "../assets/ages";
import options_parties from "../assets/parties";
import options_genders from "../assets/genders";
import options_races from "../assets/races";
export default {
  name: "Population",
  components: {
  },
  data: function () {
    return {
      load:false,
      feed: "",
      error_message: "",
      age: "age",
      country: "country",
      party: "party",
      gender: "gender",
      race: "race",
      op_age: options_ages,
      op_country : options_countries,
      op_gender: options_genders,
      op_party: options_parties,
      op_race: options_races,
    };
  },
  methods: {
    set_reset() {
      this.load = false;
      try {
        (this.age = "age"),
          (this.country = "country"),
          (this.party = "party"),
          (this.gender = "gender"),
          (this.race = "race"),
        this.feed = "";
        this.error_message = "";
      } catch (error) {
        console.log(error);
      }
    },
    async search() {
      this.load=true;
      // console.log(options_ages);
      this.feed = "";
      this.error_message = "";
      console.log(this.age);
      console.log(this.country);
      console.log(this.party);
      console.log(this.gender);
      console.log(this.race);
      try {
        const response = await axios.get(
          `http://localhost:3000/population/${this.age}/${this.country}/${this.party}/${this.gender}/${this.race}`
        );
        console.log(response.data);
        if(response.data.length != 0 ){
          this.feed = response.data;
        }else{
          this.error_message = "Sorry no result for your request"
        }
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
/* .select{
  vertical-align: -webkit-baseline-middle;
  -ms-grid-column-align:center
} */



</style>