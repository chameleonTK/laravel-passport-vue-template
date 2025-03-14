export const loader = {
    namespaced: true,
    state: {
        showed: false,
        loader: null,
        // view: null,
    },
    actions: {
        show({ commit }, loaderFunc) {
            commit('showLoader', loaderFunc);
        },
        hide({ commit }) {
            commit('hideLoader');
        },

        // setView({ commit }, viewName) {
        //     commit('view', viewName);
        // },
    },
    mutations: {
        showLoader(state) {
            state.showed = true;
            if (!_.isNil(state.loader)) {
                state.loader.hide();
            } 
            
            state.loader = this._vm.$loading.show({});
        },
        hideLoader(state) {
            if (!_.isNil(state.loader)) {
                state.loader.hide();
            }
        },

        // view(state, viewName) {
        //     state.view = viewName;
        // }
    }
};
