<template>
    <div class="column full-height">
        <div class="open-appointment">
            <q-btn
                label="Открыть запись на приём"
                color="primary"
                class="no-border-radius full-width"
                stretch flat
                @click="$store.dispatch('dialogs/appointment/show')"
            />
        </div>
        <div>
            <q-list>
                <q-expansion-item
                    v-for="organization in list"
                    :key="organization.id"
                    header-class="bg-grey-9 text-white"
                    expand-icon-class="text-white"
                    dense
                >
                    <template v-slot:header>
                        <q-item-section>
                            <q-item-label>
                                {{ organization.name }}
                            </q-item-label>
                        </q-item-section>
                    </template>

                    <q-expansion-item
                        v-for="service in organization.services"
                        :key="service.id"
                        header-class="bg-grey-5 text-black"
                        expand-icon-class="text-white"
                        dense
                    >
                        <template v-slot:header>
                            <q-item-section>
                                <q-item-label>
                                    {{ service.name }}
                                </q-item-label>
                            </q-item-section>
                        </template>

                        <q-item
                            v-for="appointment in service.appointments"
                            :key="appointment.id"
                            clickable
                            @click="$store.dispatch('pages/appointment/appointment/set', {appointment, service, organization})"
                        >
                            <q-item-section>
                                <q-item-label>{{ getDateString(appointment.date) }}</q-item-label>
                                <q-item-label caption><span class="text-bold">Количество заявок: </span><span>{{ appointment.registrations.length }}</span></q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                                {{ getDayName(appointment.date) }}
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>
                </q-expansion-item>
            </q-list>
        </div>

        <AppointmentDialog/>
    </div>
</template>

<script>
export default {
    components: {
        AppointmentDialog: () => import('./AppointmentDialog')
    },
    computed: {
        list() {
            return this.$store.getters['pages/appointment/list/getList']
        }
    },
    methods: {
        getDateString(date) {
            const months = [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря'
            ]

            const dateArray = date.split('.')

            return parseInt(dateArray[0]) + ' ' + months[dateArray[1] - 1]
        },
        getDayName(date) {
            const days = [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота'
            ]

            const dateArray = date.split('.')

            const d = new Date(dateArray[2], dateArray[1] - 1, dateArray[0])
            return days[d.getDay()]
        }
    },
    mounted() {
        this.$store.dispatch('pages/appointment/list/fetchList')
    }
}
</script>

<style lang="scss" scoped>
.open-appointment {
    border-bottom: 1px solid $grey-4;
}
</style>
