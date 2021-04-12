<template>
    <AdminHomepage v-if="$can('open', 'AdminHomepage')"/>
    <ClientHomepage v-else-if="$can('open', 'ClientHomepage')"/>
</template>

<script>
import AdminHomepage  from "./admin/Index";
import ClientHomepage from "./client/Index";

export default {
    name: 'PageIndex',
    components: {
        AdminHomepage,
        ClientHomepage
    }
}
</script>
