<template>
    <q-page padding>
        <OrganizationsTable ref="organizationsTable"
                            @openOrganizationDialog="openOrganizationDialog"/>
        <OrganizationDialog ref="organizationDialog" @save="$refs.organizationsTable.loadOrganizations()"/>
    </q-page>
</template>

<script>
import OrganizationsTable from "components/tables/OrganizationsTable";
import OrganizationDialog from "components/dialogs/OrganizationDialog";

export default {
    name: "Organizations",
    components: {
        OrganizationsTable,
        OrganizationDialog
    },
    methods: {
        openOrganizationDialog(id) {
            this.$refs.organizationDialog.show(id)
        }
    },
    mounted() {
        this.$refs.organizationsTable.loadOrganizations();
    }
}
</script>
