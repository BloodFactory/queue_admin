<template>
    <div class="col bg-white">
        <AppointmentRecords/>
    </div>
</template>

<script>
export default {
    components: {
        AppointmentRecords: () => import('./AppointmentRecords')
    }
}
</script>
