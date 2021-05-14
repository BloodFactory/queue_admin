import {api} from "boot/axios";

export default {
    namespaced: true,
    state: {
        filter: '',
        users: null
    },
    getters: {
        getFilter: state => state.filter,
        getUsers: state => state.users
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter
        },
        setUsers(state, users) {
            state.users = users
        },
    },
    actions: {
        fetchUsers({state, commit}) {
            const params = {}

            if (state.filter) {
                params.filter = state.filter
            }

            return api({
                url: '/users',
                method: 'get',
                params
            })
                .then(response => {
                    commit('setUsers', response.data)

                    return Promise.resolve()
                })
        }
    }
}
