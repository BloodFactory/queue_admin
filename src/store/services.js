import {api} from "boot/axios";

export default {
    namespaced: true,
    state: {
        services: null
    },
    getters: {
        getServices: state => state.services
    },
    mutations: {
        setServices(state, services) {
            state.services = services
        }
    },
    actions: {
        fetch({state, commit}) {
            const params = {}

            if (state.filter) {
                params.filter = state.filter
            }

            return api({
                url: '/services',
                method: 'get',
                params
            }).then(response => {
                commit('setServices', response.data)

                return Promise.resolve()
            })
        }
    }
}
