<template>
      <!-- middle overflow-y-scroll relative"-->
    <div class="w-full md:w-1/2 h-full px-6 overflow-y-scroll relative"  >
 
  <!--router for switching the pages  -->
      <div>
        <router-view />
      </div>
    </div>
</template>

<script>
export default {
    name: "Wall"
}
</script>

<style>

</style>