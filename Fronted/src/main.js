import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes'
import './assets/styles/index.css';
import VueSlideBar from 'vue-slide-bar'
 
Vue.component('VueSlideBar', VueSlideBar)
Vue.config.productionTip = true;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


