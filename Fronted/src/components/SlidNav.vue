<template>
   <div
      class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between"
    >
      <div>
        <button
          class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue"
        >
          <i class="fab fa-twitter"></i>
        </button>
        <div>
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="switch_page(tab.id)"
            :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${
              id === tab.id ? 'text-blue' : ''
            }`"
          >
            <i :class="`${tab.icon} text-2xl mr-4 text-left`"></i>
            <p class="text-lg font-semibold text-left hidden lg:block">
              {{ tab.title }}
            </p>
          </button>
        </div>
        <button
          class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue"
        >
          <p class="hidden lg:block">Tweet</p>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>
    </div>
</template>

<script>
export default {
    name: "SlidNav",

 data() {
    return {
      tabs: [
        { icon: "fas fa-home", title: "Home", id: "home" },
        { icon: "fas fa-hashtag", title: "Explore", id: "explore" },
        { icon: "far fa-bell", title: "Notifications", id: "notifications" },
        { icon: "far fa-envelope", title: "Messages", id: "messages" },
        { icon: "far fa-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fas fa-clipboard-list", title: "Lists", id: "lists" },
        { icon: "far fa-user", title: "Profile", id: "profile" },
        { icon: "fas fa-balance-scale", title: "RepFeed", id: "repfeed" },
        { icon: "fas fa-globe-europe", title: "Population", id: "population" },
        //{icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
      ],
      id: "home",
      dropdown: false,
      trending: [
        { title: "BGU", text: "join us to lovly learning" },
        { title: "SISE", text: "be an engeiner" },
        { title: "Software Engineering", text: "hard but worth it" },
        { title: "Computer Science", text: "Not an engeiner" },
        { title: "Anti-Corona", text: "fighting the virus" },
        { title: "TAU", text: "come and learn" },
        { title: "Thechnion", text: "just learn" },
        { title: "HUJI", text: "the spirit of learning" },
      ],
    };
  },
  methods: {
    addNewTweet() {
      let newTweet = {
        content: this.tweet.content,
      };
      this.tweets.push(newTweet);
    },
    switch_page(tab_id) {
      if (tab_id === "repfeed") {
        this.$router.push("/repFeed").catch(() => {
          this.$forceUpdate();
        });
      }
      if (tab_id === "population") {
        this.$router.push("/population").catch(() => {
          this.$forceUpdate();
        });
      }
      if (tab_id === "home") {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
  },
};
</script>




<style>

</style>