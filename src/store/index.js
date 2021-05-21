import Vue        from 'vue'
import Vuex       from 'vuex'
import {api}      from 'boot/axios'
import ability    from 'src/helpers/ability'
import security   from 'src/helpers/security'
import {Dark}     from 'quasar'
import dictionary from './dictionaries'
import pages      from './pages'
import dialogs    from './dialogs'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            dictionary,
            pages,
            dialogs
        },

        state: {
            isAuthorized: false,
            user: null,
            rights: {}
        },

        getters: {
            getIsAuthorized(state) {
                return state.isAuthorized
            },
            getUser(state) {
                return state.user
            },
            getRights(state) {
                return state.rights
            }
        },

        mutations: {
            setIsAuthorized(state, isAuthorized) {
                state.isAuthorized = isAuthorized
            },
            setUser(state, user) {
                state.user = user
            },
            setRights(state, rights) {
                state.rights = rights
            }
        },

        actions: {
            initApp({dispatch}) {
                if (!security.getToken()) return

                let appLoader = dispatch('loadApp')

                let organizationsLoader = dispatch('dictionary/organizations/fetchOptions')
                let servicesLoader      = dispatch('dictionary/services/fetchOptions')

                return Promise.all([
                    appLoader,
                    organizationsLoader,
                    servicesLoader
                ])

            },
            loadApp({commit}) {
                return api({
                    url: '/init',
                    method: 'get'
                }).then(response => {
                    const data = response.data
                    commit('setUser', data.user)
                    ability.update(data.ability)

                    if (data.hasOwnProperty('rights')) {
                        commit('setRights', data.rights)
                    }

                    commit('setIsAuthorized', true)

                    if (data.settings && data.settings.darkMode) {
                        Dark.set(true)
                    } else {
                        Dark.set(false)
                    }

                    return Promise.resolve()
                }).catch(error => {
                    return Promise.reject(error)
                })
            },

            logout({commit}) {
                return new Promise((resolve, reject) => {
                    commit('setIsAuthorized', false)
                    security.clear()
                    ability.update([
                        {
                            action: 'open',
                            resource: 'Login'
                        }
                    ])

                    resolve()
                })
            }
        },

        strict: process.env.DEBUGGING
    })

    return Store
}
