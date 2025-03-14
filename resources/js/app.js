require('./bootstrap');
window.Vue = require('vue');
window._ = require('lodash');

window.seedrandom = require('seedrandom');

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
Vue.use(Toast, {});

import numeral from 'numeral';
Vue.prototype.numeral = numeral;

import Moment from 'vue-moment'
Vue.use(Moment)

import VueRx from 'vue-rx'
Vue.use(VueRx)

import utils from './utils.js';
// console.log("UTILS", utils);
Vue.mixin(utils);


// import AuthService from './services/AuthService.js';
// import StorageService from './services/StorageService.js';
// Vue.prototype.auth = AuthService;

import App from './App.vue';
import router from './Routes';

import setupInterceptors from './services/APIInterceptors.js';
import store from './stores';

setupInterceptors(store);

Vue.directive('dynamic', function(newValue) {
    this.el.innerHTML = newValue;
    this.vm.$compile(this.el);
});

const app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});