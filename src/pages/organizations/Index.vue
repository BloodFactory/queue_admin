<template>
    <q-page>
        <ToolBar @addOrganization="$refs.organizationDialog.show()"/>

        <OrganizationsList ref="organizationsTable" @edit="(organization) => {$refs.organizationDialog.show(organization)}"/>

        <OrganizationDialog ref="organizationDialog"/>
    </q-page>
</template>

<script>
import ToolBar            from './ToolBar'
import OrganizationsList  from './OrganizationsList'
import OrganizationDialog from './OrganizationDialog'

export default {
    name: "Organizations",
    components: {
        ToolBar,
        OrganizationsList,
        OrganizationDialog
    }
}
</script>
