import {api} from 'boot/axios'
import {
    Dialog,
    Loading
}            from 'quasar'

export default {
    namespaced: true,
    state: {
        id: null,
        organization: null,
        date: '',
        service: null,
        timeFrom: '',
        timeTill: '',
        needDinner: false,
        dinnerFrom: '',
        dinnerTill: '',
        persons: 0,
        duration: 0,
        registrations: []
    },
    getters: {
        getId: state => state.id,
        getOrganization: state => state.organization,
        getService: state => state.service,
        getDate: state => state.date,
        getTimeFrom: state => state.timeFrom,
        getTimeTill: state => state.timeTill,
        getNeedDinner: state => state.needDinner,
        getDinnerFrom: state => state.dinnerFrom,
        getDinnerTill: state => state.dinnerTill,
        getPersons: state => state.persons,
        getDuration: state => state.duration,
        getRegistrations: state => state.registrations
    },
    mutations: {
        setId(state, id) {
            state.id = id
        },
        setOrganization(state, organization) {
            state.organization = organization
        },
        setService(state, service) {
            state.service = service
        },
        setDate(state, date) {
            state.date = date
        },
        setTimeFrom(state, timeFrom) {
            state.timeFrom = timeFrom
        },
        setTimeTill(state, timeTill) {
            state.timeTill = timeTill
        },
        setNeedDinner(state, needDinner) {
            state.needDinner = needDinner
        },
        setDinnerFrom(state, dinnerFrom) {
            state.dinnerFrom = dinnerFrom
        },
        setDinnerTill(state, dinnerTill) {
            state.dinnerTill = dinnerTill
        },
        setPersons(state, persons) {
            state.persons = persons
        },
        setDuration(state, duration) {
            state.duration = duration
        },
        setRegistrations(state, registrations) {
            state.registrations = registrations
        }
    },
    actions: {
        set({commit}, {appointment, service, organization}) {
            if (null === appointment || undefined === appointment) {
                commit('setId', null)
                commit('setDate', '')
                commit('setTimeFrom', '')
                commit('setTimeTill', '')
                commit('setNeedDinner', false)
                commit('setDinnerFrom', '')
                commit('setDinnerTill', '')
                commit('setDuration', 0)
                commit('setPersons', '')
                commit('setOrganization', null)
                commit('setService', null)
                commit('setRegistrations', [])
            } else {
                commit('setId', appointment.id)
                commit('setDate', appointment.date)
                commit('setTimeFrom', appointment.timeFrom)
                commit('setTimeTill', appointment.timeTill)
                commit('setNeedDinner', appointment.needDinner)
                commit('setDinnerFrom', appointment.dinnerFrom)
                commit('setDinnerTill', appointment.dinnerTill)
                commit('setDuration', appointment.duration)
                commit('setPersons', appointment.persons)
                commit('setOrganization', {
                    value: organization.id,
                    label: organization.name,
                })
                commit('setService', {
                    value: service.id,
                    label: service.name,
                })
                commit('setRegistrations', appointment.registrations)
            }
        },

        save({state, dispatch}) {
            Loading.show()

            const data = new FormData

            data.append('organization', state.organization.value)
            data.append('service', state.service.value)
            data.append('date', state.date)
            data.append('timeFrom', state.timeFrom)
            data.append('timeTill', state.timeTill)
            data.append('needDinner', state.needDinner ? '1' : '')
            data.append('persons', state.persons.toString())
            data.append('duration', state.duration.toString())

            if (state.needDinner) {
                data.append('dinnerFrom', state.dinnerFrom)
                data.append('dinnerTill', state.dinnerTill)
            }

            api({
                url: '/appointments/' + state.id,
                method: 'post',
                data
            }).then(() => {
                return dispatch('pages/appointment/list/fetchList', null, {root: true})
            }).finally(() => {
                Loading.hide()
            })
        },

        delete({state, dispatch}) {
            Dialog.create({
                title: 'Подтвердите действие',
                message: 'Удалить запись?',
                cancel: 'Отмена'
            }).onOk(() => {
                Loading.show()

                api({
                    url: '/appointments/' + state.id,
                    method: 'delete'
                }).then(() => {
                    return Promise.all([
                        dispatch('pages/appointment/list/fetchList', null, {root: true}),
                        dispatch('set', {})
                    ])
                }).finally(() => {
                    Loading.hide()
                })
            })
        },

        fetchRegistrations({state, commit}) {
            const data = new FormData

            data.append('appointmentID', state.id)

            return api({
                url: '/registrations',
                method: 'get',
                data
            }).then(response => {
                commit('setRegistrations', response.data)
                return Promise.resolve()
            })
        }
    }
}
