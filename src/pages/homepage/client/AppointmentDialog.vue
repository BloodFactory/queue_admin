<template>
    <q-dialog v-model="dialog">
        <q-card style="min-width: 900px">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Открытие записи на приём</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="appointmentForm" @submit="save">
                    <div class="row q-mb-lg q-col-gutter-x-lg">
                        <q-input
                            label="Дата"
                            v-model="date"
                            style="flex: 1"
                            mask="##.##.####"
                            outlined dense square
                        >
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="date" mask="DD.MM.YYYY">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Close" color="primary" flat/>
                                            </div>
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <div class="flex">
                            <q-btn
                                label="Заполнить из шаблона"
                                color="purple"
                                class="no-border-radius"
                                unelevated stretch
                                @click="$store.dispatch('dialogs/appointmentFillFromTemplate/show')"
                            />
                        </div>
                    </div>

                    <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
                        <div class="col-6">
                            <UserOrganizationsSelect
                                v-model="organization"
                                scope="user.edit"
                                outlined dense
                            />
                        </div>
                        <div class="col-6">
                            <q-btn
                                :label="'Услуга' + (null !== service && (': ' + service.label) || '')"
                                class="full-width no-border-radius"
                                outline no-caps
                                @click="$refs.appointmentServicePickerDialog.show()"
                            />
                        </div>

                        <div class="col-6">
                            <q-input
                                v-model="timeFrom"
                                mask="##:##"
                                label="Начало приёма"
                                square outlined dense
                            >
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="timeFrom">
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
                                v-model="timeTill"
                                label="Конец приёма"
                                square outlined dense
                            >
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="timeTill">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                        <div class="col-2">
                            <q-checkbox
                                v-model="needDinner"
                                label="Обед"
                            />
                        </div>
                        <div class="col-5">
                            <q-input
                                v-model="dinnerFrom"
                                mask="##:##"
                                label="Начало обеда"
                                :disable="!needDinner"
                                square outlined dense
                            >
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="dinnerFrom">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-5">
                            <q-input
                                label="Конец обеда"
                                v-model="dinnerTill"
                                mask="##:##"
                                :disable="!needDinner"
                                square outlined dense
                            >
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="dinnerTill">
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
                                label="Длительность приёма (в минутах)"
                                v-model="duration"
                                square outlined dense
                            />
                        </div>
                        <div class="col-6">
                            <q-input
                                label="Количество вакантных мест на один приём"
                                v-model="persons"
                                square outlined dense
                            />
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="appointmentForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>

        <AppointmentServicePickerDialog ref="appointmentServicePickerDialog"/>
        <FillFromTemplateDialog/>
    </q-dialog>
</template>

<script>
export default {
    components: {
        UserOrganizationsSelect: () => import('components/selects/UserOrganizationsSelect'),
        AppointmentServicePickerDialog: () => import('./AppointmentServicePickerDialog'),
        FillFromTemplateDialog: () => import('./FillFromTemplateDialog')
    },
    computed: {
        dialog: {
            get() {
                return this.$store.getters['dialogs/appointment/getDialog']
            },
            set(dialog) {
                this.$store.commit('dialogs/appointment/setDialog', dialog)
            }
        },
        date: {
            get() {
                return this.$store.getters['dialogs/appointment/getDate']
            },
            set(date) {
                this.$store.commit('dialogs/appointment/setDate', date)
            }
        },
        organization: {
            get() {
                return this.$store.getters['dialogs/appointment/getOrganization']
            },
            set(organization) {
                this.$store.commit('dialogs/appointment/setOrganization', organization)
            }
        },
        service() {
            const serviceID = this.$store.getters['dialogs/appointment/getService']
            const services  = this.$store.getters['dictionary/services/getOptions']

            if (null === serviceID) return null

            const result = getService(services)

            return result

            function getService(services) {
                for (let service of services) {
                    if (service.value === serviceID) return service

                    if (service.hasOwnProperty('children')) {
                        let serv = getService(service.children)

                        if (serv) return serv
                    }
                }
                return null
            }
        },
        timeFrom: {
            get() {
                return this.$store.getters['dialogs/appointment/getTimeFrom']
            },
            set(timeFrom) {
                this.$store.commit('dialogs/appointment/setTimeFrom', timeFrom)
            }
        },
        timeTill: {
            get() {
                return this.$store.getters['dialogs/appointment/getTimeTill']
            },
            set(timeTill) {
                this.$store.commit('dialogs/appointment/setTimeTill', timeTill)
            }
        },
        needDinner: {
            get() {
                return this.$store.getters['dialogs/appointment/getNeedDinner']
            },
            set(needDinner) {
                this.$store.commit('dialogs/appointment/setNeedDinner', needDinner)
            }
        },
        dinnerFrom: {
            get() {
                return this.$store.getters['dialogs/appointment/getDinnerFrom']
            },
            set(dinnerFrom) {
                this.$store.commit('dialogs/appointment/setDinnerFrom', dinnerFrom)
            }
        },
        dinnerTill: {
            get() {
                return this.$store.getters['dialogs/appointment/getDinnerTill']
            },
            set(dinnerTill) {
                this.$store.commit('dialogs/appointment/setDinnerTill', dinnerTill)
            }
        },
        duration: {
            get() {
                return this.$store.getters['dialogs/appointment/getDuration']
            },
            set(duration) {
                this.$store.commit('dialogs/appointment/setDuration', duration)
            }
        },
        persons: {
            get() {
                return this.$store.getters['dialogs/appointment/getPersons']
            },
            set(persons) {
                this.$store.commit('dialogs/appointment/setPersons', persons)
            }
        }
    },
    methods: {
        save() {
            this.$store.dispatch('dialogs/appointment/save').then(() => {
                this.dialog = false
            })
        }
    }
}
</script>
