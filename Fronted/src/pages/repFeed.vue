<template>
   <div class="md:w-full h-full">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Repfeed</h1>
        <i class="fas fa-balance-scale text-xl text-blue"></i>
      </div>
      <VueSlideBar v-model="value"
                  @callbackRange="callbackRange"
                  @dragEnd="update_value"
                  />
                  
      <button submit class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0" @click="update_res()" style="position: relative; left: 80%; top: 15px;">
          Reset
      </button>
      <hr style="position: relative;top: 20px">
    </div>
</template>

<script>
import axios from 'axios'
export default {
  
  data(){
    return{
     
      value: 50,

    
  }
  },
  methods: {
          
       update_res(){ 
         const res = axios.get("http://localhost:3000/repfeed"+"/reset")
          .then(res => console.log(res))
          .catch() (error => {
                this.errorMessage = error.message;
                 console.error("There was an error!", error);
          })
              
    },
                update_value(){ 
                const response = axios.get("http://localhost:3000/repfeed"+"?value="+ this.value)
                .then(response => console.log(response))
                .catch() (error => {
                      this.errorMessage = error.message;
                       console.error("There was an error!", error);
          })
              
    },
    callbackRange (val) {
                console.log(val)
                //this.sliderWithLabel.rangeValue = val;
                value = val;
                console.log(this.value)
              }




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

   
    
  }
  
}
</script>

<style>

</style>


