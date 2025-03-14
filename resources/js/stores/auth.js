import AuthService from '../services/AuthService';
import StorageService from '../services/StorageService';

export const auth = {
    namespaced: true,
    state: {
        loggedIn: false,
        me: null
    },
    actions: {
        me({ commit, dispatch }, data) {
            commit("initMeSuccess", data);
        },
        
    },
    mutations: {
        initMeSuccess(state, user) {
            state.loggedIn = true;
            state.me = user;
        },
    }
};
