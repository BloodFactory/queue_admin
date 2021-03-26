<template>
    <AdminHomepage v-if="$can('open', 'AdminHomepage')"/>
    <ClientHomepage v-else-if="$can('open', 'ClientHomepage')"/>
</template>

<script>
import AdminHomepage  from "components/AdminHomepage";
import ClientHomepage from "components/ClientHomepage";

export default {
    name: 'PageIndex',
    components: {
        AdminHomepage,
        ClientHomepage
    }
}
</script>
