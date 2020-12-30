<template>
   <div class="md:w-full h-full">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Repfeed</h1>
        <i class="fas fa-balance-scale text-xl text-blue"></i>
      </div>
      <VueSlideBar v-model="value" /> 
      
      <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0" style="position: relative; left: 80%; top: 15px;">
          Reset
      </button>
      <hr style="position: relative;top: 20px">
    </div>
</template>

<script>
export default {
  data(){
    return{
      value: 50,
    }
  }

}
</script>

<style>

</style>