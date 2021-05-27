<template>
    <div class="col-2 appointment-list">
        <div class="column full-height">
            <div class="open-appointment">
                <q-btn
                    label="Открыть запись на приём"
                    color="primary"
                    class="no-border-radius full-width"
                    stretch flat
                    @click="() => {
                        $emit('change-appointment')
                        $store.dispatch('pages/appointment/settings/setAppointmentSettings', null)
                    }"
                />
            </div>
            <div>
                <q-list>
                    <q-item
                        v-for="appointment in appointments"
                        :key="appointment.id"
                        :active="appointment.id === $store.getters['pages/appointment/settings/getId']"
                        clickable
                        @click="() => {
                            $emit('change-appointment')
                            $store.dispatch('pages/appointment/settings/setAppointmentSettings', appointment)
                        }"
                    >
                        <q-item-section>
                            <q-item-label>{{ getDateString(appointment.date) }}</q-item-label>
                            <q-item-label caption>{{ appointment.organization.label }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        appointments() {
            return this.$store.getters['pages/appointment/list/getList']
        }
    },
    methods: {
        getDateString(date) {
            const months    = [
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
        }
    },
    mounted() {
        this.$store.dispatch('pages/appointment/list/fetchList')
    }
}
</script>

<style lang="scss" scoped>
.appointment-list {
    background: linear-gradient(to bottom, #fff, $grey-2);
    border-right: 1px solid $grey-4;
}

.open-appointment {
    border-bottom: 1px solid $grey-4;
}
</style>

