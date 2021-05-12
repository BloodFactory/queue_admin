import {api}    from 'boot/axios'
import {Notify} from 'quasar'

export default {
    namespaced: true,
    state: {
        filter: '',
        servicesGroups: null,
    },
    getters: {
        getFilter: state => state.filter,
        getServicesGroups: state => {
            if (null === state.servicesGroups) return null

            return state.servicesGroups.filter(servicesGroup => !state.filter || servicesGroup.name.includes(state.filter))
        }
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter
        },
        setServicesGroups(state, servicesGroups) {
            state.servicesGroups = servicesGroups
        }
    },
    actions: {
        fetchServicesGroups({commit}) {
            return api({
                url: '/servicesGroups',
                method: 'get'
            })
                .then(response => {
                    commit('setServicesGroups', response.data)

                    return Promise.resolve(response)
                })
                .catch(error => {
                    Notify.create({
                        message: error.response.data,
                        type: 'negative',
                        position: 'top'
                    })

                    return Promise.reject(error)
                })
        },

        fetchServices({commit}, {servicesGroupID}) {
            const params = {}

            if (null !== servicesGroupID) {
                params.servicesGroupID = servicesGroupID
            }

            api({
                url: '/services',
                method: 'get',
                params
            })
                .then(response => {
                    commit('setServices', {
                        services: response.data,
                        servicesGroupID: servicesGroupID
                    })
                })
        }
    }
}
