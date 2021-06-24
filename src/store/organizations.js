import {api} from "boot/axios";

export default {
    namespaced: true,
    state: {
        organizations: null
    },
    getters: {
        getOrganizations: state => state.organizations
    },
    mutations: {
        setOrganizations(state, organizations) {
            state.organizations = organizations
        }
    },
    actions: {
        fetch({state, commit}) {
            const params = {}

            if (state.filter) {
                params.filter = state.filter
            }

            return api({
                url: '/organizations',
                method: 'get',
                params
            }).then(response => {
                commit('setOrganizations', response.data)

                return Promise.resolve()
            })
        }
    }
}
