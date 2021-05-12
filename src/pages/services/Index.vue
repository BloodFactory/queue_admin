<template>
    <q-page>
        <ToolBar @addServicesGroup="$refs.serviceGroupDialog.show()"/>

        <ServicesGroupsList ref="servicesGroupsList" @edit="(servicesGroup) => {$refs.serviceGroupDialog.show(servicesGroup)}"/>

        <ServiceGroupDialog ref="serviceGroupDialog"/>
    </q-page>
</template>

<script>
import ToolBar            from './ToolBar'
import ServicesGroupsList from './ServicesGroupsList'
import ServiceGroupDialog from './ServiceGroupDialog'

export default {
    components: {
        ToolBar,
        ServicesGroupsList,
        ServiceGroupDialog
    }
}
</script>
