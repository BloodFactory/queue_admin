import {Loading} from 'quasar'
import {api}     from 'boot/axios'

export default {
    namespaced: true,
    state: {
        dialog: false,
        id: null,
        username: '',
        password: '',
        confirmPassword: '',
        lastName: '',
        firstName: '',
        middleName: ''
    },
    getters: {
        getDialog: state => state.dialog,
        getId: state => state.id,
        getUsername: state => state.username,
        getPassword: state => state.password,
        getConfirmPassword: state => state.confirmPassword,
        getLastName: state => state.lastName,
        getFirstName: state => state.firstName,
        getMiddleName: state => state.middleName
    },
    mutations: {
        setDialog: (state, dialog) => {
            state.dialog = dialog
        },
        setId: (state, id) => {
            state.id = id
        },
        setUsername: (state, username) => {
            state.username = username
        },
        setPassword: (state, password) => {
            state.password = password
        },
        setConfirmPassword: (state, confirmPassword) => {
            state.confirmPassword = confirmPassword
        },
        setLastName: (state, lastName) => {
            state.lastName = lastName
        },
        setFirstName: (state, firstName) => {
            state.firstName = firstName
        },
        setMiddleName: (state, middleName) => {
            state.middleName = middleName
        }
    },
    actions: {
        open({state, commit, dispatch}, props = null) {
            commit('setPassword', '')
            commit('setConfirmPassword', '')

            if (props && props.user) {
                const {id, username, userData: {lastName, firstName, middleName}} = props.user

                commit('setId', id)
                commit('setUsername', username)
                commit('setLastName', lastName)
                commit('setFirstName', firstName)
                commit('setMiddleName', middleName)
            } else {
                commit('setId', null)
                commit('setUsername', '')
                commit('setLastName', '')
                commit('setFirstName', '')
                commit('setMiddleName', '')
            }

            commit('setDialog', true)
        },
        save({state, commit, dispatch}) {
            Loading.show()

            const data = new FormData()

            data.append('username', state.username)
            data.append('password', state.password)
            data.append('confirmPassword', state.confirmPassword)
            data.append('userData[lastName]', state.lastName)
            data.append('userData[firstName]', state.firstName)
            data.append('userData[middleName]', state.middleName)

            let url = '/users'

            if (state.id) url += '/' + state.id

            api({
                url,
                method: 'post',
                data
            }).then(() => {
                return dispatch('pages/users/fetchUsers', null, {root: true})
            }).then(() => {
                commit('setDialog', false)
            }).finally(() => {
                Loading.hide()
            })
        }
    }
}
