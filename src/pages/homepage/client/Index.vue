<template>
    <q-page padding>
        <div class="row">
            <UserOrganizationsList v-model="organization"/>
        </div>
    </q-page>
</template>

<script>
export default {
    components: {
        UserOrganizationsList: () => import('./UserOrganizationsList')
    },
    data() {
        return {
            organization: null
        }
    }
}
</script>
