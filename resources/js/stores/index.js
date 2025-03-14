import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { auth } from './auth';
import { loader } from './loader';

export default new Vuex.Store({
    modules: {
        auth,
        loader
    }
});
