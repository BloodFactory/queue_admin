<template>
    <q-page class="bg-grey-4" padding>
        <OrganizationsTable ref="organizationsTable"
                            @openOrganizationDialog="openOrganizationDialog"/>
        <OrganizationDialog ref="organizationDialog"
                            @save="$refs.organizationsTable.loadOrganizations()"/>
    </q-page>
</template>

<script>
import OrganizationsTable from "pages/organizations/OrganizationsTable";
import OrganizationDialog from "pages/organizations/OrganizationDialog";

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
