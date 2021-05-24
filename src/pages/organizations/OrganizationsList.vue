<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-xs">
            <OrganizationItem
                v-for="(organization, index) in organizations"
                :key="organization.id"
                :organization="organization"
            />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        OrganizationItem: () => import('./OrganizationItem')
    },
    computed: {
        organizations() {
            return this.$store.getters['pages/organizations/getOrganizations']
        }
    },
    mounted() {
        if (null === this.$store.getters['pages/organizations/getOrganizations']) {
            this.$q.loading.show()

            this.$store.dispatch('pages/organizations/fetchOrganizations').then(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>
