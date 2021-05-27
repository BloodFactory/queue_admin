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
            let alreadyLoading = Loading.isActive

            if (!alreadyLoading)
                Loading.show()

            return api({
                url: '/appointments',
                method: 'get'
            }).then(response => {
                commit('setList', response.data)
            }).finally(() => {
                if (!alreadyLoading)
                    Loading.hide()
            })
        }
    }
}
