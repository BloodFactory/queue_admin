<template>
    <q-dialog v-model="dialog">
        <q-card style="min-width: 800px" square>
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Формирование шаблона записи на приём</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="appointmentTemplateForm" @submit="$store.dispatch('dialogs/appointmentTemplate/save')">
                    <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
                        <div class="col-12">
                            <UserOrganizationsSelect
                                v-model="organizations"
                                label="Организации"
                                scope="user.edit"
                                dense outlined
                            />
                        </div>
                        <div class="col-12">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="text-h6">Услуги</div>
                                </q-card-section>

                                <q-card-section>
                                    <div>
                                        <q-chip
                                            v-for="service in services"
                                            :key="service.value"
                                            size="sm"
                                            color="teal"
                                            text-color="white"
                                        >
                                            {{ service.label }}
                                        </q-chip>
                                    </div>
                                </q-card-section>

                                <q-card-actions>
                                    <q-btn
                                        label="Выбрать"
                                        class="full-width no-border-radius"
                                        color="secondary"
                                        unelevated
                                        @click="$refs.servicePickerDialog.show()"
                                    />
                                </q-card-actions>
                            </q-card>
                        </div>
                        <div class="col-6">
                            <q-input
                                v-model="timeFrom"
                                label="Начало приёма"
                                mask="##:##"
                                outlined dense square
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
                                mask="##:##"
                                outlined dense square
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
                                label="Начало перерыва на обед"
                                mask="##:##"
                                :disable="!needDinner"
                                outlined dense square
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
                                v-model="dinnerTill"
                                label="Конец перерыва на обед"
                                mask="##:##"
                                :disable="!needDinner"
                                outlined dense square
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
                                label="Количество вакантных мест на один приём"
                                v-model="persons"
                                dense outlined square
                            />
                        </div>
                        <div class="col-6">
                            <q-input
                                label="Длительность одного приёма (в минутах)"
                                v-model="duration"
                                dense outlined square
                            />
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="appointmentTemplateForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>

        <ServicePickerDialog ref="servicePickerDialog"/>
    </q-dialog>
</template>

<script>
export default {
    components: {
        UserOrganizationsSelect: () => import('components/selects/UserOrganizationsSelect'),
        ServicePickerDialog: () => import('./ServicePickerDialog')
    },
    computed: {
        dialog: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getDialog']
            },
            set(dialog) {
                this.$store.commit('dialogs/appointmentTemplate/setDialog', dialog)
            }
        },
        organizations: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getOrganizations']
            },
            set(organizations) {
                this.$store.commit('dialogs/appointmentTemplate/setOrganizations', organizations)
            }
        },
        services() {
            const store    = this.$store
            const services = store.getters['dictionary/services/getOptions']
            const result   = []

            function getSelectedServices(services) {
                for (let service of services) {
                    if (store.getters['dialogs/appointmentTemplate/getServices'].includes(service.value)) {
                        result.push({
                            value: service.value,
                            label: service.label
                        })
                    }

                    if (service.children && service.children.length > 0) {
                        getSelectedServices(service.children)
                    }
                }
            }

            getSelectedServices(services)

            // return this.$store.getters['dialogs/appointmentTemplate/getServices']
            return result
        },
        timeFrom: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getTimeFrom']
            },
            set(timeFrom) {
                this.$store.commit('dialogs/appointmentTemplate/setTimeFrom', timeFrom)
            }
        },
        timeTill: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getTimeTill']
            },
            set(timeFrom) {
                this.$store.commit('dialogs/appointmentTemplate/setTimeTill', timeFrom)
            }
        },
        needDinner: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getNeedDinner']
            },
            set(needDinner) {
                this.$store.commit('dialogs/appointmentTemplate/setNeedDinner', needDinner)
            }
        },
        dinnerFrom: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getDinnerFrom']
            },
            set(dinnerFrom) {
                this.$store.commit('dialogs/appointmentTemplate/setDinnerFrom', dinnerFrom)
            }
        },
        dinnerTill: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getDinnerTill']
            },
            set(dinnerTill) {
                this.$store.commit('dialogs/appointmentTemplate/setDinnerTill', dinnerTill)
            }
        },
        persons: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getPersons']
            },
            set(persons) {
                this.$store.commit('dialogs/appointmentTemplate/setPersons', persons)
            }
        },
        duration: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getDuration']
            },
            set(duration) {
                this.$store.commit('dialogs/appointmentTemplate/setDuration', duration)
            }
        }
    }
}
</script>
