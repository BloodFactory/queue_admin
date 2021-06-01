import {api}     from 'boot/axios'
import {Loading} from 'quasar'

export default {
    namespaced: true,
    state: {
        list: null
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

            if (!alreadyLoading) Loading.show()

            return api({
                url: 'appointmentTemplates',
                method: 'get'
            }).then(response => {
                commit('setList', response.data)

                return Promise.resolve()
            }).finally(() => {
                if (!alreadyLoading) Loading.hide()
            })
        }
    }
}
