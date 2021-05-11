import Vue      from 'vue'
import Vuex     from 'vuex'
import {api}    from 'boot/axios'
import ability  from 'src/helpers/ability'
import security from 'src/helpers/security'
import {Dark}   from 'quasar'

import dictionary from './dictionaries'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            dictionary
        },

        state: {
            isAuthorized: false,
            user: null
        },

        getters: {
            getIsAuthorized(state) {
                return state.isAuthorized
            },
            getUser(state) {
                return state.user
            }
        },

        mutations: {
            setIsAuthorized(state, isAuthorized) {
                state.isAuthorized = isAuthorized
            },
            setUser(state, user) {
                state.user = user
            }
        },

        actions: {
            initApp({dispatch}) {
                if (!security.getToken()) return

                let appLoader = dispatch('loadApp')

                let organizationsLoader = dispatch('dictionary/organizations/fetchOptions')

                return Promise.all([
                    appLoader,
                    organizationsLoader
                ])

            },
            loadApp({commit}) {
                return api({
                    url: '/init',
                    method: 'get'
                }).then(response => {
                    commit('setUser', response.data.user)
                    ability.update(response.data.ability)

                    commit('setIsAuthorized', true)

                    if (response.data.settings && response.data.settings.darkMode) {
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
