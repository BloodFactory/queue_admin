<template>
    <div v-if="userOrganizationsList.length > 1" class="col-2">
        <q-card class="shadow-0" square>
            <q-list>
                <q-item-label header align="right">Организации</q-item-label>

                <q-item
                    v-for="userOrganization in userOrganizationsList"
                    :key="userOrganization.value"
                    :inset-level="userOrganization.inset ? 1 : 0"
                    :active="organization && organization.value === userOrganization.value"
                    clickable dense
                    @click="organization = userOrganization"
                >
                    <q-item-section class="text-caption">{{ userOrganization.label }}</q-item-section>
                </q-item>
            </q-list>
        </q-card>
    </div>
</template>

<script>
export default {
    props: ['value'],
    computed: {
        organization: {
            get() {
                return this.value
            },
            set(org) {
                this.$emit('input', org)
            }
        },
        userOrganizationsList() {
            const result        = []
            const organizations = this.$store.getters['dictionary/organizations/getOptions']
            const rights        = this.$store.getters['getRights']

            let inset
            for (let organization of organizations) {
                inset = false

                if (rights[organization.value] && rights[organization.value]['view']) {
                    inset = true
                    result.push({
                        label: organization.label,
                        value: organization.value
                    })
                }

                if (organization.hasOwnProperty('branches') && organization.branches.length > 0) {
                    for (let branch of organization.branches) {
                        if (rights[branch.value] && rights[branch.value]['view']) {
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
    },
    mounted() {
        console.log(this.userOrganizationsList)
        if (this.userOrganizationsList.length === 1) {
            this.$emit('input', this.userOrganizationsList[0])
        }
    }
}
</script>
