import {Loading} from "quasar";
import {api}     from "boot/axios";

export default {
    namespaced: true,
    state: {
        dialog: false,
        id: null,
        name: '',
        parent: null
    },
    getters: {
        getDialog: state => state.dialog,
        getId: state => state.id,
        getName: state => state.name
    },
    mutations: {
        setDialog(state, dialog) {
            state.dialog = dialog
        },
        setId(state, id) {
            state.id = id
        },
        setName(state, name) {
            state.name = name
        },
        setParent(state, parent) {
            state.parent = parent
        }
    },
    actions: {
        open({commit}, props = null) {
            commit('setId', null)
            commit('setName', '')
            commit('setParent', null)

            if (props && props.serviceGroup) {
                const {id, name} = props.serviceGroup

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

            const url  = ['/servicesGroups']
            const data = new FormData

            data.append('name', state.name)

            if (null !== state.id) url.push(state.id.toString())
            if (null !== state.parent) data.append('parent', state.parent)

            api({
                url: url.join('/'),
                method: 'post',
                data
            }).then(() => {
                return Promise.all([
                    dispatch('services/fetch', null, {root: true}),
                ])
            }).then(() => {
                commit('setDialog', false)
            }).finally(() => {
                Loading.hide()
            })

        }
    }
}
