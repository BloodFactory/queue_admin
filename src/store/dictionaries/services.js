import {api} from 'boot/axios';

export default {
    namespaced: true,
    state: {
        options: []
    },
    getters: {
        getOptions(state) {
            return state.options;
        }
    },
    mutations: {
        setOptions(state, options) {
            state.options = options;
        }
    },
    actions: {
        fetch({commit}) {
            return api({
                url: '/services',
                method: 'get'
            }).then(response => {
                commit('setOptions', response.data);

                return Promise.resolve();
            }).catch(error => {
                return Promise.reject(error);
            })
        }
    }
}
