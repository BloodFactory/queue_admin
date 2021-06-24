<template>
    <q-page>
        <ToolBar/>

        <ServicesList/>

        <ServicesDialog/>
        <ServiceGroupDialog/>
    </q-page>
</template>

<script>
export default {
    components: {
        ToolBar: () => import ('./ToolBar'),
        ServicesList: () => import('./ServicesList'),
        ServiceGroupDialog: () => import('./ServiceGroupDialog'),
        ServicesDialog: () => import('./ServiceDialog')
    }
}
</script>
