<template>
    <q-page padding>
        <div class="row">
            <UserOrganizationsList/>
        </div>
    </q-page>
</template>

<script>
export default {
    components: {
        UserOrganizationsList: () => import('./UserOrganizationsList')
    }
}
</script>
