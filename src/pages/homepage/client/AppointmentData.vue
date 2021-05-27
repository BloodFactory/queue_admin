<template>
    <div class="col bg-white">
        <AppointmentSettings ref="appointmentSettings"/>
        <AppointmentRecords/>
    </div>
</template>

<script>
export default {
    components: {
        AppointmentSettings: () => import('./AppointmentSettings'),
        AppointmentRecords: () => import('./AppointmentRecords')
    },
    methods: {
        resetSettings() {
            this.$refs.appointmentSettings.reset()
        }
    }
}
</script>
