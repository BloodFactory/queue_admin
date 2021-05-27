export default {
    namespaced: true,
    state: {
        dialog: false
    },
    getters: {
        getDialog: state => state.dialog
    },
    mutations: {
        setDialog(state, dialog) {
            state.dialog = dialog
        }
    },
    actions: {
        open({commit}) {
            commit('setDialog', true)
        }
    }
}
