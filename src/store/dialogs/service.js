import {api}     from 'boot/axios'
import {Loading} from 'quasar'

export default {
    namespaced: true,
    state: {
        dialog: false,
        id: null,
        groupId: null,
        name: '',
    },
    getters: {
        getDialog: state => state.dialog,
        getName: state => state.name,
        getId: state => state.id,
        getGroupId: state => state.groupId
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
        setGroupId: (state, groupId) => {
            state.groupId = groupId
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

            if (props && props.groupId) {
                commit('setGroupId', props.groupId)
            } else {
                commit('setGroupId', null)
            }

            commit('setDialog', true)
        },
        save({state, commit, dispatch}) {
            Loading.show()

            const url  = ['/services']
            const data = new FormData

            data.append('name', state.name)

            if (null !== state.id) url.push(state.id.toString())
            if (null !== state.groupId) data.append('serviceGroupId', state.groupId)

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
