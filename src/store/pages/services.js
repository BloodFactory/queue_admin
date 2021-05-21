import {api} from 'boot/axios'

export default {
    namespaced: true,
    state: {
        filter: '',
        services: null
    },
    getters: {
        getFilter: state => state.filter,
        getServices: state => {
            if (state.filter) {
                function filterServices(services) {
                    const result = []
                    for (let service of services) {
                        if (service.name.includes(state.filter)) {
                            result.push(service)
                            continue
                        }

                        if (service.children && service.children.length > 0) {
                            const children = filterServices(service.children)

                            if (children.length > 0) {
                                service.children = children
                                result.push(service)
                            }
                        }
                    }
                    return result
                }

                const services = JSON.parse(JSON.stringify(state.services))

                return filterServices(services)
            } else {
                return state.services
            }
        }
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter
        },
        setServices(state, services) {
            state.services = services
        },
    },
    actions: {
        fetchServices({state, commit}) {
            const params = {}

            if (state.filter) {
                params.filter = state.filter
            }

            return api({
                url: '/services',
                method: 'get',
                params
            })
                .then(response => {
                    commit('setServices', response.data)

                    return Promise.resolve()
                })
        }
    }
}
