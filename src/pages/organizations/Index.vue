<template>
    <q-page>
        <ToolBar @addOrganization="$refs.organizationDialog.show()"/>

        <OrganizationsList/>

        <OrganizationDialog/>
        <BranchDialog/>
    </q-page>
</template>

<script>

export default {
    name: "Organizations",
    components: {
        ToolBar: () => import('./ToolBar'),
        OrganizationsList: () => import ('./OrganizationsList'),
        OrganizationDialog: () => import('./OrganizationDialog'),
        BranchDialog: () => import('./BranchDialog')
    }
}
</script>
