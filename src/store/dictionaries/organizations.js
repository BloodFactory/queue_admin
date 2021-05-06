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
        setOrganizations(state, options) {
            state.options = options;
        }
    }
}
