import {api}     from 'boot/axios'
import {Loading} from 'quasar'

export default {
    namespaced: true,
    state: {
        dialog: false,
        organizations: [],
        services: [],
        timeForm: '',
        timeTill: '',
        needDinner: false,
        dinnerFrom: '',
        dinnerTill: '',
        persons: 0,
        duration: 0
    },
    getters: {
        getDialog: state => state.dialog,
        getOrganizations: state => state.organizations,
        getServices: state => state.services,
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
        setOrganizations(state, organizations) {
            state.organizations = organizations
        },
        setServices(state, services) {
            state.services = services
        },
        setTimeFrom(state, timeFrom) {
            state.timeForm = timeFrom
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
        save({state, dispatch}) {
            Loading.show()

            const data = new FormData

            for (let organization of state.organizations) {
                data.append('organizations[]', organization.value)
            }

            for (let service of state.services) {
                data.append('services[]', service)
            }

            data.append('timeFrom', state.timeForm)
            data.append('timeTill', state.timeTill)

            if (state.needDinner) {
                data.append('needDinner', '1')
                data.append('dinnerFrom', state.dinnerFrom)
                data.append('dinnerTill', state.dinnerTill)
            }

            data.append('duration', state.duration.toString())
            data.append('persons', state.persons.toString())

            api({
                url: '/appointmentTemplates',
                method: 'post',
                data
            }).then(response => {
                return dispatch('pages/appointment/templates/fetchList', null, {root: true})
            }).finally(() => {
                Loading.hide()
            })
        }
    }
}
