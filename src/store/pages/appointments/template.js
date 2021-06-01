import {api} from 'boot/axios'
import {
    Dialog,
    Loading
}            from 'quasar'

export default {
    namespaced: true,
    state: {
        id: null,
        service: null,
        timeFrom: '',
        timeTill: '',
        needDinner: null,
        dinnerFrom: '',
        dinnerTill: '',
        persons: 0,
        duration: 0
    },
    getters: {
        getId: state => state.id,
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
        setId(state, id) {
            state.id = id
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
        },
    },
    actions: {
        setTemplate({commit}, template = null) {
            if (null !== template) {
                commit('setId', template.id)
                commit('setService', template.service)
                commit('setTimeFrom', template.timeFrom)
                commit('setTimeTill', template.timeTill)
                commit('setNeedDinner', template.needDinner)
                commit('setDinnerFrom', template.dinnerFrom)
                commit('setDinnerTill', template.dinnerTill)
                commit('setDuration', template.duration)
                commit('setPersons', template.persons)
            } else {
                commit('setId', null)
                commit('setService', null)
                commit('setTimeFrom', '')
                commit('setTimeTill', '')
                commit('setNeedDinner', false)
                commit('setDinnerFrom', '')
                commit('setDinnerTill', '')
                commit('setDuration', 0)
                commit('setPersons', 0)
            }

        },
        delete({state, dispatch}) {
            Dialog.create({
                title: 'Подтвердите действие',
                message: 'Вы действительно хотите удалить запись?',
                cancel: 'Отмена'
            }).onOk(() => {
                Loading.show()

                api({
                    url: '/appointmentTemplates/' + state.id,
                    method: 'delete'
                }).then(() => {
                    return dispatch('pages/appointment/templates/fetchList', null, {root: true})
                }).then(() => {
                    return dispatch('setTemplate')
                }).finally(() => {
                    Loading.hide()
                })
            })
        },
        save({state, dispatch}) {
            Dialog.create({
                title: 'Подтвердите действие',
                message: 'Сохранить запись?',
                cancel: 'Отмена'
            }).onOk(() => {
                Loading.show()

                const data = new FormData

                data.append('timeFrom', state.timeFrom)
                data.append('timeTill', state.timeTill)
                data.append('service', state.service.id)
                data.append('duration', state.duration.toString())
                data.append('persons', state.persons.toString())

                if (state.needDinner) {
                    data.append('dinnerFrom', state.dinnerFrom)
                    data.append('dinnerTill', state.dinnerTill)
                    data.append('needDinner', '1')
                }

                api({
                    url: '/appointmentTemplates/' + state.id,
                    method: 'post',
                    data
                }).then(() => {
                    return dispatch('pages/appointment/templates/fetchList', null, {root: true})
                }).finally(() => {
                    Loading.hide()
                })
            })
        }
    }
}
