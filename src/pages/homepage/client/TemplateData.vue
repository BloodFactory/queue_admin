<template>
    <div class="col bg-white">
        <div v-if="null === id">
            <p>Выберите шаблон, чтобы продолжить работу с ним</p>
        </div>

        <div v-else class="q-pa-lg">
            <q-form @submit="$store.dispatch('pages/appointment/template/save')">
                <div class="row q-mb-lg">
                    <div class="text-h6" style="max-width: calc(100% - 240px);">{{ service && service.name || '' }} (шаблон)</div>
                    <q-space/>
                    <div class="q-gutter-x-md">
                        <q-btn
                            label="Удалить"
                            color="red"
                            class="no-border-radius"
                            unelevated
                            @click="$store.dispatch('pages/appointment/template/delete')"
                        />
                        <q-btn
                            label="Сохранить"
                            color="primary"
                            class="no-border-radius"
                            unelevated
                            @click="$store.dispatch('pages/appointment/template/save')"
                        />
                    </div>

                </div>

                <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
                    <div class="col-6">
                        <q-input
                            label="Начало приёма"
                            v-model="timeFrom"
                            outlined square
                        />
                    </div>
                    <div class="col-6">
                        <q-input
                            label="Конец приёма"
                            v-model="timeTill"
                            outlined square
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
                            outlined square
                        />
                    </div>
                    <div class="col-5">
                        <q-input
                            label="Конец обеда"
                            v-model="dinnerTill"
                            outlined square
                        />
                    </div>

                    <div class="col-6">
                        <q-input
                            label="Количество вакантных мест на один приём"
                            v-model="persons"
                            outlined square
                        />
                    </div>
                    <div class="col-6">
                        <q-input
                            label="Длительность одного приёма (в минутах)"
                            v-model="duration"
                            outlined square
                        />
                    </div>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        id() {
            return this.$store.getters['pages/appointment/template/getId']
        },
        service() {
            return this.$store.getters['pages/appointment/template/getService']
        },
        timeFrom: {
            get() {
                return this.$store.getters['pages/appointment/template/getTimeFrom']
            },
            set(timeFrom) {
                this.$store.commit('pages/appointment/template/setTimeFrom', timeFrom)
            }
        },
        timeTill: {
            get() {
                return this.$store.getters['pages/appointment/template/getTimeTill']
            },
            set(timeTill) {
                this.$store.commit('pages/appointment/template/setTimeTill', timeTill)
            }
        },
        needDinner: {
            get() {
                return this.$store.getters['pages/appointment/template/getNeedDinner']
            },
            set(needDinner) {
                this.$store.commit('pages/appointment/template/setNeedDinner', needDinner)
            }
        },
        dinnerFrom: {
            get() {
                return this.$store.getters['pages/appointment/template/getDinnerFrom']
            },
            set(dinnerFrom) {
                this.$store.commit('pages/appointment/template/setDinnerFrom', dinnerFrom)
            }
        },
        dinnerTill: {
            get() {
                return this.$store.getters['pages/appointment/template/getDinnerTill']
            },
            set(dinnerTill) {
                this.$store.commit('pages/appointment/template/setDinnerTill', dinnerTill)
            }
        },
        persons: {
            get() {
                return this.$store.getters['pages/appointment/template/getPersons']
            },
            set(persons) {
                this.$store.commit('pages/appointment/template/setPersons', persons)
            }
        },
        duration: {
            get() {
                return this.$store.getters['pages/appointment/template/getDuration']
            },
            set(duration) {
                this.$store.commit('pages/appointment/template/setDuration', duration)
            }
        }
    }
}
</script>
