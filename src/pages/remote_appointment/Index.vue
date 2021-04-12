<template>
    <q-page class="bg-grey-4" padding>
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
