<template>
    <q-page padding>
        <ServicesTable ref="servicesTable"
                       @openServiceDialog="openServiceDialog"/>
        <ServiceDialog ref="serviceDialog"
        @save="$refs.servicesTable.loadServices()"/>
    </q-page>
</template>

<script>
import ServiceDialog from "components/dialogs/ServiceDialog";
import ServicesTable from "components/tables/ServicesTable";

export default {
    name: "Services",
    components: {
        ServiceDialog,
        ServicesTable
    }, methods: {
        openServiceDialog(id) {
            this.$refs.serviceDialog.show(id)
        }
    },
    mounted() {
        this.$refs.servicesTable.loadServices();
    }

}
</script>
