import {api}     from 'boot/axios'
import {Loading} from 'quasar'

export default {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        getList: state => state.list
    },
    mutations: {
        setList(state, list) {
            state.list = list
        }
    },
    actions: {
        fetchList({commit}) {
            Loading.show()

            return api({
                url: '/appointments',
                method: 'get'
            }).then(response => {
                commit('setList', response.data)
            }).finally(() => {
                Loading.hide()
            })
        }
    }
}
