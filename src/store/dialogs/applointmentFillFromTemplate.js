export default {
    namespaced: true,
    state: {
        dialog: false,
        organization: null,
        service: null
    },
    getters: {
        getDialog: state => state.dialog,
        getOrganization: state => state.organization,
        getService: state => state.service
    },
    mutations: {
        setDialog(state, dialog) {
            state.dialog = dialog
        },
        setOrganization(state, organization) {
            state.organization = organization
        },
        setService(state, service) {
            state.service = service
        }
    },
    actions: {
        show({commit}) {
            commit('setDialog', true)
        },
        save({state, dispatch}) {
            for (let template of state.organization.templates) {
                if (template.service.id === state.service.value) {
                    dispatch('dialogs/appointment/set', {
                        template,
                        organization: {
                            value: state.organization.id,
                            label: state.organization.name,
                        }
                    }, {root: true})
                    return
                }
            }
        }
    }
}
