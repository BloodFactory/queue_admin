<template>
    <div class="q-pa-lg">
        <div v-if="registrations.length">

        </div>

        <div v-else>
            <div class="q-mb-lg">
                <div class="row">
                    <div class="col-6">
                        <div class="column">
                            <div class="col-12 text-bold text-h6">{{ date }}</div>
                            <div class="col-12 text-bold text-subtitle1">{{ organization && organization.label || '' }}</div>
                            <div class="col-12 text-caption">{{ service && service.label || '' }}</div>
                        </div>
                    </div>
                    <div class="col-6 right">
                        <div class="flex">
                            <q-space/>
                            <div class="g-gutter-x-md">
                                <q-btn
                                    label="Удалить"
                                    color="red"
                                    class="no-border-radius"
                                    unelevated
                                    @click="$store.dispatch('pages/appointment/appointment/delete')"
                                />

                                <q-btn
                                    label="Сохранить"
                                    color="green"
                                    class="no-border-radius"
                                    unelevated
                                    @click="$store.dispatch('pages/appointment/appointment/save')"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
                <div class="col-6">
                    <q-input
                        label="Начало приёма"
                        v-model="timeFrom"
                        outlined dense square
                    />
                </div>
                <div class="col-6">
                    <q-input
                        label="Конец приёма"
                        v-model="timeTill"
                        outlined dense square
                    />
                </div>
                <div class="col-2">
                    <q-checkbox
                        label="Обед"
                        v-model="needDinner"
                    />
                </div>
                <div class="col-5">
                    <q-input
                        label="Начало обеда"
                        v-model="dinnerFrom"
                        outlined dense square
                    />
                </div>
                <div class="col-5">
                    <q-input
                        label="Конец обеда"
                        v-model="dinnerTill"
                        outlined dense square
                    />
                </div>
                <div class="col-6">
                    <q-input
                        label="Длительность одного приёма (в минутах)"
                        v-model="duration"
                        outlined dense square
                    />
                </div>
                <div class="col-6">
                    <q-input
                        label="Количество вакантных мест на один приём"
                        v-model="persons"
                        outlined dense square
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        date(){
            return this.$store.getters['pages/appointment/appointment/getDate']
        },
        timeFrom: {
            get() {
                return this.$store.getters['pages/appointment/appointment/getTimeFrom']
            },
            set(timeFrom) {
                this.$store.commit('pages/appointment/appointment/setTimeFrom', timeFrom)
            }
        },
        timeTill: {
            get() {
                return this.$store.getters['pages/appointment/appointment/getTimeTill']
            },
            set(timeTill) {
                this.$store.commit('pages/appointment/appointment/setTimeTill', timeTill)
            }
        },
        needDinner: {
            get() {
                return this.$store.getters['pages/appointment/appointment/getNeedDinner']
            },
            set(needDinner) {
                this.$store.commit('pages/appointment/appointment/setNeedDinner', needDinner)
            }
        },
        dinnerFrom: {
            get() {
                return this.$store.getters['pages/appointment/appointment/getDinnerFrom']
            },
            set(dinnerFrom) {
                this.$store.commit('pages/appointment/appointment/setDinnerFrom', dinnerFrom)
            }
        },
        dinnerTill: {
            get() {
                return this.$store.getters['pages/appointment/appointment/getDinnerTill']
            },
            set(dinnerTill) {
                this.$store.commit('pages/appointment/appointment/setDinnerTill', dinnerTill)
            }
        },
        duration: {
            get() {
                return this.$store.getters['pages/appointment/appointment/getDuration']
            },
            set(duration) {
                this.$store.commit('pages/appointment/appointment/setDuration', duration)
            }
        },
        persons: {
            get() {
                return this.$store.getters['pages/appointment/appointment/getPersons']
            },
            set(persons) {
                this.$store.commit('pages/appointment/appointment/setPersons', persons)
            }
        },
        organization() {
            return this.$store.getters['pages/appointment/appointment/getOrganization']
        },
        service() {
            return this.$store.getters['pages/appointment/appointment/getService']
        },
        registrations() {
            return this.$store.getters['pages/appointment/appointment/getRegistrations']
        }
    }
}
</script>
