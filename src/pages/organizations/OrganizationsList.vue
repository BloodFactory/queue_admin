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
            const filter        = this.$store.getters['pages/organizations/getFilter']
            const organizations = this.$store.getters['organizations/getOrganizations']

            if (!filter) return organizations

            const filteredOrganizations = []

            for (let organization of organizations) {
                if (organization.name.includes(filter)) {
                    filteredOrganizations.push(organization)
                    continue
                }

                const filteredBranches = []

                if (organization.hasOwnProperty('branches') && organization.branches.length) {
                    for (let branch of organization.branches) {
                        if (branch.name.includes(filter)) {
                            filteredBranches.push(branch)
                        }
                    }
                }

                if (filteredBranches.length) {
                    const newOrganization = {}
                    Object.assign(newOrganization, organization)
                    newOrganization.branches = filteredBranches
                    filteredOrganizations.push(newOrganization)
                }
            }

            return filteredOrganizations
        }
    }
}
</script>
