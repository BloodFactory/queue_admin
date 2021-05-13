<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-lg">
            <OrganizationItem
                v-for="(organization, index) in organizations"
                :key="organization.id"
                :organization="organization"
                @edit="$emit('edit', organization)"
            />
        </div>
    </div>
</template>

<script>
import OrganizationItem from "./OrganizationItem";

export default {
    components: {
        OrganizationItem
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
