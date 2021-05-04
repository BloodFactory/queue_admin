<template>
    <q-page padding>
        <ServicesTable ref="servicesTable"
                       @openServiceDialog="openServiceDialog"/>
        <ServiceDialog ref="serviceDialog"
                       @save="$refs.servicesTable.loadServices()"/>
    </q-page>
</template>

<script>
import ServiceDialog from "./ServiceDialog";
import ServicesTable from "./ServicesTable";

export default {
    name: "Index",
    components: {
        ServiceDialog,
        ServicesTable
    },
    methods: {
        openServiceDialog(id) {
            this.$refs.serviceDialog.show(id)
        }
    },
    computed: {
        darkMode() {
            return this.$store.getters['getDarkMode'];
        }
    },
    mounted() {
        this.$refs.servicesTable.loadServices();
    }
}
</script>
