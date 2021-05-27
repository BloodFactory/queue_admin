import {api} from 'boot/axios'

import {Loading} from 'quasar'

export default {
    namespaced: true,
    state: {
        id: null,
        organization: null,
        service: null,
        date: '',
        timeFrom: '',
        timeTill: '',
        needDinner: false,
        dinnerFrom: '',
        dinnerTill: '',
        duration: 0,
        persons: 0
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
        getDuration: state => state.duration,
        getPersons: state => state.persons
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
        setDuration(state, duration) {
            state.duration = duration
        },
        setPersons(state, persons) {
            state.persons = persons
        }
    },
    actions: {
        setAppointmentSettings({commit}, appointment) {
            if (null === appointment) {
                commit('setId', null)
                commit('setOrganization', null)
                commit('setService', null)
                commit('setDate', '')
                commit('setTimeFrom', '')
                commit('setTimeTill', '')
                commit('setNeedDinner', false)
                commit('setDinnerFrom', '')
                commit('setDinnerTill', '')
                commit('setDuration', 0)
                commit('setPersons', 0)
            } else {
                commit('setId', appointment.id)
                commit('setOrganization', appointment.organization)
                commit('setService', appointment.service)
                commit('setDate', appointment.date)
                commit('setTimeFrom', appointment.timeFrom)
                commit('setTimeTill', appointment.timeTill)
                commit('setNeedDinner', appointment.needDinner)
                commit('setDinnerFrom', appointment.dinnerFrom)
                commit('setDinnerTill', appointment.dinnerTill)
                commit('setDuration', appointment.duration)
                commit('setPersons', appointment.persons)
            }
        },
        saveAppointmentSettings({state}) {
            Loading.show()

            const data = new FormData

            data.append('organization', state.organization.value)
            data.append('service', state.service.value)
            data.append('date', state.date)
            data.append('timeFrom', state.timeFrom)
            data.append('timeTill', state.timeTill)
            data.append('needDinner', state.needDinner ? '1' : '0')
            data.append('duration', state.duration.toString())
            data.append('persons', state.persons.toString())

            if (state.needDinner) {
                data.append('dinnerFrom', state.dinnerFrom)
                data.append('dinnerTill', state.dinnerTill)
            }

            api({
                url: '/appointments',
                method: 'POST',
                data
            }).finally(() => {
                Loading.hide()
            })
        }
    }
}
