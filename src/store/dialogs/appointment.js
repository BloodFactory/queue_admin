import {api}     from 'boot/axios'
import {Loading} from 'quasar'

export default {
    namespaced: true,
    state: {
        dialog: false,
        date: '',
        organization: null,
        service: null,
        timeFrom: '',
        timeTill: '',
        needDinner: false,
        dinnerFrom: '',
        dinnerTill: '',
        persons: 0,
        duration: 0
    },
    getters: {
        getDialog: state => state.dialog,
        getDate: state => state.date,
        getOrganization: state => state.organization,
        getService: state => state.service,
        getTimeFrom: state => state.timeFrom,
        getTimeTill: state => state.timeTill,
        getNeedDinner: state => state.needDinner,
        getDinnerFrom: state => state.dinnerFrom,
        getDinnerTill: state => state.dinnerTill,
        getPersons: state => state.persons,
        getDuration: state => state.duration
    },
    mutations: {
        setDialog(state, dialog) {
            state.dialog = dialog
        },
        setDate(state, date) {
            state.date = date
        },
        setOrganization(state, organization) {
            state.organization = organization
        },
        setService(state, service) {
            state.service = service
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
        }
    },
    actions: {
        show({commit}) {
            commit('setDialog', true)
        },
        set({commit}, {template, organization}) {
            commit('setTimeFrom', template.timeFrom)
            commit('setTimeTill', template.timeTill)
            commit('setNeedDinner', template.needDinner)
            commit('setDinnerFrom', template.dinnerFrom)
            commit('setDinnerTill', template.dinnerTill)
            commit('setDuration', template.duration)
            commit('setPersons', template.persons)

            commit('setService', template.service.id)
            commit('setOrganization', organization)
        },
        save({state, commit, dispatch}) {
            Loading.show()

            const data = new FormData

            data.append('organization', state.organization.value)
            data.append('service', state.service)
            data.append('date', state.date)
            data.append('timeFrom', state.timeFrom)
            data.append('timeTill', state.timeTill)
            data.append('duration', state.duration.toString())
            data.append('persons', state.persons.toString())

            data.append('needDinner', state.needDinner ? '1' : '0')

            if (state.needDinner) {
                data.append('dinnerFrom', state.dinnerFrom)
                data.append('dinnerTill', state.dinnerTill)
            }

            return api({
                url: '/appointments',
                method: 'post',
                data
            }).then(() => {
                commit('setDialog', false)
                return Promise.resolve()
            }).then(() => {
                dispatch('pages/appointment/list/fetchList', null, {root: true})
            }).finally(() => {
                Loading.hide()
            })
        }
    }
}
