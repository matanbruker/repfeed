<template>
      <div
      class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6"
    >
      <input
        class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4"
        placeholder="Search Twitter"
      />
      <i
        class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"
      ></i>
      <div class="w-full rounded-lg bg-lightest">
        <div class="flex items-center justify-between p-3">
          <p class="text-lg font-bold">Trends for You</p>
          <i class="fas fa-cog text-lg text-blue"></i>
        </div>
        <button v-for="trend in trending" :key="trend" class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter">
          <div>
            <p class="text-xs text-left leading-tight text-dark">{{trend.title}}</p>
            <p class="text-xs text-left leading-tight text-dark">{{trend.text}}</p>
          </div>
        </button>
      </div>
    </div>
</template>

<script>
export default {
name: "Trending",

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
}
</script>

<style>

</style>