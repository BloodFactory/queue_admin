import {api} from 'boot/axios'

export default {
    namespaced: true,
    state: {
        filter: '',
        services: null
    },
    getters: {
        getFilter: state => state.filter,
        getServices: state => state.services
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter
        },
        setServices(state, services) {
            state.services = services
        }
    },
    actions: {
        fetchServices({state, commit}) {
            const params = {}

            if (state.filter) {
                params.filter = state.filter
            }

            return api({
                url: '/services',
                method: 'get',
                params
            })
                .then(response => {
                    commit('setServices', response.data)

                    return Promise.resolve()
                })
        }
    }
}
