import {api} from "boot/axios";

export default {
    namespaced: true,
    state: {
        filter: '',
        organizations: null
    },
    getters: {
        getFilter: state => state.filter,
        getOrganizations: state => state.organizations
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter
        },
        setOrganizations(state, organizations) {
            state.organizations = organizations
        },
    },
    actions: {
        fetchOrganizations({state, commit}) {
            const params = {}

            if (state.filter) {
                params.filter = state.filter
            }

            return api({
                url: '/organizations',
                method: 'get',
                params
            })
                .then(response => {
                    commit('setOrganizations', response.data)

                    return Promise.resolve()
                })
        }
    }
}
