<template>
    <q-page padding>
        <OrganizationsTable ref="organizationsTable"
                            @openOrganizationDialog="openOrganizationDialog"/>
        <OrganizationDialog ref="organizationDialog"
                            @save="$store.dispatch('dictionary/organizations/fetchOptions')"/>
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
    }
}
</script>
