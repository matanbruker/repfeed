<template>
  <div class="md:w-full h-full">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Population</h1>
        <i class="fas fa-globe-europe text-xl text-blue"></i>
      </div>
      <vue-dropdown
        :config="config_age"
        @setSelectedOption="setNewSelectedOption_age($event);"
      ></vue-dropdown>
      <vue-dropdown
        :config="config_country"
        @setSelectedOption="setNewSelectedOption_country($event);"
      ></vue-dropdown>
      <vue-dropdown
        :config="config_party"
        @setSelectedOption="setNewSelectedOption_party($event);"
      ></vue-dropdown>
      <vue-dropdown
        :config="config_gender"
        @setSelectedOption="setNewSelectedOption_gender($event);"
      ></vue-dropdown>
      <vue-dropdown
        :config="config_race"
        @setSelectedOption="setNewSelectedOption_race($event);"
      ></vue-dropdown>
      <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0" style="position: relative; left: 80%; top: 15px;">
          Reset
      </button>
      
      <hr style="position: relative;top: 20px">
    </div>
</template>

<script>
import vueDropdown from "../components/vue-dropdown/vue-dropdown";
export default {
name: "Population",
  components: {
      vueDropdown
  },
  data: function() {
    return {
      config_age: {
        options: [
          {
            value: "18-21"
          },
          {
            value: "21-35"
          },
          {
            value: "35-65"
          },
          {
            value: "65+"
          }
        ],
        placeholder: "Age",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
        width: 180
      },
      config_country: {
        options: [
          {
            value: "USA"
          },
          {
            value: "Israel"
          },
          {
            value: "Spain"
          }
        ],
        placeholder: "Country",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
        width: 180
      },
      config_party: {
        options: [
          {
            value: "Republican"
          },
          {
            value: "Democratic"
          },
          {
            value: "Other"
          }
        ],
        placeholder: "Party",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
        width: 180
      },
      config_gender: {
        options: [
          {
            value: "Male"
          },
          {
            value: "Female"
          },
          {
            value: "Other"
          }
        ],
        placeholder: "Gender",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
        width: 180
      },
      config_race: {
        options: [
          {
            value: "White"
          },
          {
            value: "Black"
          },
          {
            value: "Hispanic"
          }
        ],
        placeholder: "Race",
        backgroundColor: "#cde4f5",
        textColor: "black",
        borderRadius: "1.5em",
        border: "1px solid gray",
        width: 180
      },
    };
  },
  methods: {
    setNewSelectedOption_age(selectedOption) {
      this.config_age.placeholder = selectedOption.value;
      
    },
    setNewSelectedOption_country(selectedOption) {
     this.config_country.placeholder = selectedOption.value;
      
    }
    
  }
  
}
</script>

<style>

</style>