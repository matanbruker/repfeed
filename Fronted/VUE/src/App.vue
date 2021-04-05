<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- nav bar   -->
    <SlidNav />

    <!-- middle -->
    <Wall />

    <!-- trending -->
    <Trending />

  </div>
</template>


<script>
import SlidNav from "./components/SlidNav.vue";
import Trending from "./components/Trending.vue";
import Wall from "./components/Wall.vue";
export default {
  name: "App",

  components: {
    SlidNav,
    Trending,
    Wall,
  },
};
</script>
<style>
</style>



