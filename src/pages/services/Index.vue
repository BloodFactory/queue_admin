<template>
    <q-page>
        <ToolBar/>

        <ServicesList/>

        <ServicesDialog/>
    </q-page>
</template>

<script>
import ToolBar from './ToolBar'

export default {
    components: {
        ToolBar,
        ServicesList: () => import('./ServicesList'),
        ServicesDialog: () => import('./ServiceDialog')
    }
}
</script>
