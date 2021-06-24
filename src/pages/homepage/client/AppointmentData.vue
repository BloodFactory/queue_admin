<template>
    <div class="col bg-white">
        <div v-if="null === id">
            <p>Не выбрана запись на приём</p>
        </div>
        <div v-else>
            <AppointmentParameters/>
            <AppointmentRecords/>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        AppointmentRecords: () => import('./AppointmentRecords'),
        AppointmentParameters: () => import('./AppointmentParameters')
    },
    computed: {
        id() {
            return this.$store.getters['pages/appointment/appointment/getId']
        },
    }
}
</script>
