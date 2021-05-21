import {api}     from 'boot/axios'
import {Loading} from 'quasar'

export default {
    namespaced: true,
    state: {
        dialog: false,
        id: null,
        parent: null,
        name: '',
    },
    getters: {
        getDialog: state => state.dialog,
        getName: state => state.name,
        getId: state => state.id,
        getParent: state => state.parent
    },
    mutations: {
        setDialog: (state, dialog) => {
            state.dialog = dialog
        },
        setName: (state, name) => {
            state.name = name
        },
        setId: (state, id) => {
            state.id = id
        },
        setParent: (state, parent) => {
            state.parent = parent
        }
    },
    actions: {
        open({commit}, props = null) {
            commit('setId', null)
            commit('setName', '')

            if (props && props.service) {
                const {id, name} = props.service

                commit('setId', id)
                commit('setName', name)
            }

            if (props && props.parent) {
                commit('setParent', props.parent)
            } else {
                commit('setParent', null)
            }

            commit('setDialog', true)
        },
        save({state, commit, dispatch}) {
            Loading.show()

            const url  = ['/services']
            const data = new FormData

            data.append('name', state.name)

            if (null !== state.id) url.push(state.id)
            if (null !== state.parent) data.append('parent', state.parent)

            api({
                url: url.join('/'),
                method: 'post',
                data
            }).then(() => {
                return Promise.all([
                    dispatch('pages/services/fetchServices', null, {root: true}),
                    dispatch('dictionary/services/fetchOptions', null, {root: true})
                ])
            }).then(() => {
                commit('setDialog', false)
            }).finally(() => {
                Loading.hide()
            })

        }
    }
}
