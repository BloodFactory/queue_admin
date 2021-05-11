<template>
    <q-page>
        <q-toolbar class="bg-white shadow-1">
            <q-toolbar-title class="q-py-md">Справочник организаций</q-toolbar-title>

            <q-btn
                label="Добавить"
                icon="mdi-plus"
                color="purple"
                class="no-border-radius"
                unelevated
                @click="$refs.organizationDialog.show(null)"
            />
        </q-toolbar>
        <div class="q-pa-lg">
            <OrganizationsTable ref="organizationsTable"
                                @openOrganizationDialog="openOrganizationDialog"/>
        </div>

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
