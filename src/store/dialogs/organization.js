import {Loading} from "quasar";
import {api}     from "boot/axios";

export default {
    namespaced: true,
    state: {
        dialog: false,
        id: null,
        name: '',
        timezone: 0
    },
    getters: {
        getDialog: state => state.dialog,
        getName: state => state.name,
        getId: state => state.id,
        getTimezone: state => state.timezone
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
        setTimezone: (state, timezone) => {
            state.timezone = timezone
        }
    },
    actions: {
        open({commit}, props = null) {
            commit('setId', null)
            commit('setName', '')
            commit('setTimezone', 0)

            if (props && props.organization) {
                const {id, name, timezone} = props.organization

                commit('setId', id)
                commit('setName', name)
                commit('setTimezone', timezone)
            }

            commit('setDialog', true)
        },
        save({state, commit, dispatch}) {
            Loading.show()

            const url  = ['/organizations']
            const data = new FormData

            data.append('name', state.name)
            data.append('timezone', state.timezone.toString())

            if (null !== state.id) url.push(state.id.toString())

            api({
                url: url.join('/'),
                method: 'post',
                data
            }).then(() => {
                return Promise.all([
                    dispatch('pages/organizations/fetchOrganizations', null, {root: true}),
                    dispatch('dictionary/organizations/fetchOptions', null, {root: true})
                ])
            }).then(() => {
                commit('setDialog', false)
            }).finally(() => {
                Loading.hide()
            })

        }
    }
}
