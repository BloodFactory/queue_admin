<template>
    <q-dialog>
        <q-card>
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Настройка записи на приём</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>
        </q-card>
    </q-dialog>
    <div class="q-pa-lg">
        <div class="q-mb-lg row items-center">
            <div class="text-subtitle text-bold text-grey-7 ">Настройка записи на приём</div>
            <q-space/>
            <div class="q-gutter-x-md">
                <q-btn
                    v-if="$can('update','Appointments') && allowEdit"
                    label="Сохранить"
                    color="green"
                    class="no-border-radius"
                    type="submit"
                    form="appointmentSettingsForm"
                    unelevated
                />
                <q-btn
                    v-if="$can('delete','Appointments') && allowDelete"
                    label="Удалить"
                    color="red"
                    class="no-border-radius"
                    unelevated
                />
            </div>
        </div>
        <q-form
            ref="form"
            id="appointmentSettingsForm"
            @submit.prevent="$store.dispatch('pages/appointment/settings/saveAppointmentSettings')"
            @change="$refs.form.resetValidation()"
        >
            <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
                <div class="col-6">
                    <q-select
                        label="Организация"
                        v-model="organization"
                        :options="organizations"
                        :rules="[v => !!v || 'Выберите организацию']"
                        dense outlined lazy-rules="ondemand"
                    />
                </div>
                <div class="col-6">
                    <q-input
                        label="Услуга"
                        :value="serviceString"
                        :rules="[v => !!v || 'Выберите услугу']"
                        dense outlined readonly lazy-rules="ondemand"
                    >
                        <template v-slot:append>
                            <q-btn round dense flat icon="mdi-selection-ellipse-arrow-inside" @click="$refs.servicePickerDialog.show()">
                                <q-tooltip>Выбрать услугу из списка</q-tooltip>
                            </q-btn>
                        </template>
                    </q-input>
                </div>
                <div class="col-4">
                    <q-input
                        label="Дата"
                        v-model="date"
                        mask="##.##.####"
                        :rules="[
                            v => !!v || 'Выберите дату',
                            v => /^[0-3]\d\.[0-1]\d.[\d]+$/.test(v) || 'Неверная дата'
                            ]"
                        dense outlined lazy-rules="ondemand"
                    >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="date" first-day-of-week="1" mask="DD.MM.YYYY">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat/>
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-4">
                    <q-input
                        label="Начало приёма"
                        v-model="timeFrom"
                        mask="##:##"
                        :rules="[
                            v => !!v || 'Выберите время начала приёма физических лиц',
                            v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v) || 'Неверное время'
                            ]"
                        outlined dense lazy-rules="ondemand"
                    >
                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time
                                        v-model="timeFrom"
                                        format24h
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat/>
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-4">
                    <q-input
                        label="Конец приёма"
                        v-model="timeTill"
                        mask="##:##"
                        :rules="[
                            v => !!v || 'Выберите время окончания приёма физических лиц',
                            v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v) || 'Неверное время'
                        ]"
                        outlined dense lazy-rules="ondemand"
                    >
                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time
                                        v-model="timeTill"
                                        format24h
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat/>
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-4">
                    <q-checkbox
                        label="Перерыв на обед"
                        v-model="needDinner"
                    />
                </div>
                <div class="col-4">
                    <q-input
                        label="Начало Обеда"
                        v-model="dinnerFrom"
                        mask="##:##"
                        :rules="[
                            v => (!needDinner || needDinner && !!v) || 'Выберите время начала перерыва на обед',
                            v => (!needDinner || needDinner && /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v)) || 'Неверное время'
                        ]"
                        outlined dense lazy-rules="ondemand"
                    >
                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time
                                        v-model="dinnerFrom"
                                        format24h
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat/>
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-4">
                    <q-input
                        label="Конец обеда"
                        v-model="dinnerTill"
                        mask="##:##"
                        :rules="[
                            v => (!needDinner || needDinner && !!v) || 'Выберите время окончания перерыва на обед',
                            v => (!needDinner || needDinner && /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v)) || 'Неверное время'
                        ]"
                        outlined dense lazy-rules="ondemand"
                    >
                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time
                                        v-model="dinnerTill"
                                        format24h
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat/>
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-6">
                    <q-input
                        label="Длительность одного приёма (в минутах)"
                        v-model="duration"
                        :rules="[v => !!v || 'Введите длительность одного приёма в минутах']"
                        dense outlined lazy-rules="ondemand"
                    />
                </div>
                <div class="col-6">
                    <q-input
                        label="Количество человек на один приём"
                        v-model="persons"
                        :rules="[v => !!v || 'Введите число вакантнах мест на один приём']"
                        dense outlined lazy-rules="ondemand"
                    />
                </div>
            </div>
        </q-form>

        <ServicePickerDialog v-model="service" ref="servicePickerDialog"/>
    </div>
</template>

<script>
export default {
    components: {
        ServicePickerDialog: () => import('./ServicePickerDialog')
    },
    computed: {
        organization: {
            get() {
                return this.$store.getters['pages/appointment/settings/getOrganization']
            },
            set(organization) {
                this.$store.commit('pages/appointment/settings/setOrganization', organization)
            }
        },
        service: {
            get() {
                return this.$store.getters['pages/appointment/settings/getService']
            },
            set(service) {
                this.$store.commit('pages/appointment/settings/setService', service)
            }
        },
        serviceString() {
            const services = this.$store.getters['dictionary/services/getOptions']
            const service  = this.$store.getters['pages/appointment/settings/getService']

            if (null === service) return ''

            function getServiceString(services) {
                for (let serv of services) {
                    if (service.value === serv.value) {
                        return [serv.label]
                    }

                    if (serv.children) {
                        let inner = getServiceString(serv.children)

                        if (inner.length > 0) {
                            return [serv.label].concat(inner)
                        }
                    }
                }

                return []
            }

            return getServiceString(services).join(' / ')
        },
        date: {
            get() {
                return this.$store.getters['pages/appointment/settings/getDate']
            },
            set(date) {
                this.$store.commit('pages/appointment/settings/setDate', date)
            }
        },
        timeFrom: {
            get() {
                return this.$store.getters['pages/appointment/settings/getTimeFrom']
            },
            set(timeFrom) {
                this.$store.commit('pages/appointment/settings/setTimeFrom', timeFrom)
            }
        },
        timeTill: {
            get() {
                return this.$store.getters['pages/appointment/settings/getTimeTill']
            },
            set(timeTill) {
                this.$store.commit('pages/appointment/settings/setTimeTill', timeTill)
            }
        },
        needDinner: {
            get() {
                return this.$store.getters['pages/appointment/settings/getNeedDinner']
            },
            set(needDinner) {
                this.$store.commit('pages/appointment/settings/setNeedDinner', needDinner)
            }
        },
        dinnerFrom: {
            get() {
                return this.$store.getters['pages/appointment/settings/getDinnerFrom']
            },
            set(dinnerFrom) {
                this.$store.commit('pages/appointment/settings/setDinnerFrom', dinnerFrom)
            }
        },
        dinnerTill: {
            get() {
                return this.$store.getters['pages/appointment/settings/getDinnerTill']
            },
            set(dinnerTill) {
                this.$store.commit('pages/appointment/settings/setDinnerTill', dinnerTill)
            }
        },
        duration: {
            get() {
                return this.$store.getters['pages/appointment/settings/getDuration']
            },
            set(duration) {
                this.$store.commit('pages/appointment/settings/setDuration', duration)
            }
        },
        persons: {
            get() {
                return this.$store.getters['pages/appointment/settings/getPersons']
            },
            set(people) {
                this.$store.commit('pages/appointment/settings/setPersons', people)
            }
        },
        rights() {
            return this.$store.getters['getRights']
        },
        allowEdit() {
            if (null === this.id) return true

            if (Object.keys(this.rights).length > 0 && this.rights.hasOwnProperty(this.organization.value) && this.rights[this.organization.value].edit) return true

            return false
        },
        allowDelete() {
            if (null === this.id) return false

            if (Object.keys(this.rights).length > 0 && this.rights.hasOwnProperty(this.organization.value) && this.rights[this.organization.value].delete) return true

            return true
        },
        organizations() {
            const organizations = this.$store.getters['dictionary/organizations/getOptions']
            const result        = []

            for (let organization of organizations) {
                const {value, label, branches} = organization

                if (this.rights.hasOwnProperty(value) && this.rights[value].edit) {
                    result.push({value, label})
                }

                for (let branch of branches) {
                    const {value, label} = branch

                    if (this.rights.hasOwnProperty(value) && this.rights[value].edit) {
                        result.push({
                            value,
                            label: organization.label + ' - ' + label
                        })
                    }
                }
            }

            return result
        }
    },
    methods: {
        reset() {
            this.$refs.form.resetValidation()
        }
    }
}
</script>
