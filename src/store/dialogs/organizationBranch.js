import {Loading} from "quasar";
import {api}     from "boot/axios";

export default {
    namespaced: true,
    state: {
        dialog: false,
        id: null,
        name: '',
        organizationId: null,
        timezone: 0
    },
    getters: {
        getDialog: state => state.dialog,
        getName: state => state.name,
        getId: state => state.id,
        getTimezone: state => state.timezone,
        getOrganizationId: state => state.organizationId
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
        },
        setOrganizationId: (state, organizationId) => {
            state.organizationId = organizationId
        }
    },
    actions: {
        open({commit}, props = null) {
            commit('setId', null)
            commit('setName', '')
            commit('setTimezone', 0)
            commit('setOrganizationId', props.organizationId)

            if (props && props.branch) {
                const {id, name, timezone} = props.branch

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

            if (null !== state.id) {
                url.push(state.id.toString())
            } else {
                data.append('parent', state.organizationId.toString())
            }

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
