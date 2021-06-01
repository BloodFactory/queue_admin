<template>
    <q-page class="flex content-stretch full-width">
        <div class="row col-grow">
            <Drawer v-model="tab"/>
            <AppointmentData v-if="tab === 'appointments'"/>
            <TemplateData v-if="tab === 'templates'"/>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            tab: ''
        }
    },
    components: {
        Drawer: () => import('./Drawer'),
        AppointmentData: () => import('./AppointmentData'),
        TemplateData: () => import('./TemplateData')
    }
}
</script>
