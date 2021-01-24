import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes'
import './assets/styles/index.css';
import VueSlideBar from 'vue-slide-bar'

import { FormSelectPlugin } from 'bootstrap-vue'
Vue.use(FormSelectPlugin)

import { BFormSelect } from 'bootstrap-vue'
Vue.component('b-form-select', BFormSelect)

Vue.component('VueSlideBar', VueSlideBar)
Vue.config.productionTip = true;

// use VueRouter for routing in the App
Vue.use(VueRouter);

// set the routing in the routes.js file
const router = new VueRouter({
  routes,
});

// set the render of the App to the app id
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


