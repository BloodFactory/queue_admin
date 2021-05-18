<template>
    <div class="col-2">
        <q-card>
            <q-list>
                <q-item-label header align="right">Организации</q-item-label>

                <q-item
                    v-for="userOrganization in userOrganizationsList"
                    :key="userOrganization.value"
                    :inset-level="userOrganization.inset ? 1 : 0"
                    clickable>
                    <q-item-section>{{ userOrganization.label }}</q-item-section>
                </q-item>
            </q-list>
        </q-card>
    </div>
</template>

<script>
export default {
    computed: {
        userOrganizationsList() {
            const result        = []
            const organizations = this.$store.getters['dictionary/organizations/getOptions']
            const rights        = this.$store.getters['getRights']

            let inset
            for (let organization of organizations) {
                inset = false

                if (rights[organization.value] && rights[organization.value]['view']) {
                    inset = true
                    console.log('Организация', organization)
                    result.push({
                        label: organization.label,
                        value: organization.value
                    })
                }

                if (organization.hasOwnProperty('branches') && organization.branches.length > 0) {
                    for (let branch of organization.branches) {
                        if (rights[branch.value] && rights[branch.value]['view']) {
                            console.log('Филиал', branch)
                            result.push({
                                label: branch.label,
                                value: branch.value,
                                inset
                            })
                        }
                    }
                }
            }

            return result
        }
    }
}
</script>
