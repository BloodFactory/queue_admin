<template>
    <q-page class="flex content-stretch full-width">
        <div class="row col-grow">
            <AppointmentList @change-appointment="$refs.appointmentData.resetSettings()"/>
            <AppointmentData ref="appointmentData"/>
        </div>
    </q-page>
</template>

<script>
export default {
    components: {
        AppointmentList: () => import('./AppointmentList'),
        AppointmentData: () => import('./AppointmentData')
    }
}
</script>
