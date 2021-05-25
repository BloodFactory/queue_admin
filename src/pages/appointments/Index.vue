<template>
    <q-page>
        <q-toolbar class="bg-white shadow-1 q-py-sm">
            <div class="row items-center q-gutter-x-md" style="flex: 1">
                <div class="row q-gutter-x-md" style="flex: 1">
                    <div v-if="actualOrganization" class="text-h6">
                        {{ actualOrganization.label }}
                    </div>
                    <template v-else>
                        <div style="flex: 1">
                            <q-select
                                label="Организация"
                                v-model="organization"
                                :options="organizations"
                                square dense outlined
                            />
                        </div>

                        <transition
                            enter-active-class="animated slideInRight"
                            leave-active-class="animated slideOutRight"
                        >
                            <div v-if="branches.length" style="flex: 1">
                                <q-select
                                    label="Филиал"
                                    v-model="branch"
                                    :options="branches"
                                    square dense outlined
                                />
                            </div>
                        </transition>
                    </template>
                </div>
                <q-btn
                    label="Открыть запись"
                    color="purple"
                    class="no-border-radius"
                    unelevated
                />
            </div>

        </q-toolbar>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            organization: null,
            branch: null,
            actualOrganization: null
        }
    },
    computed: {
        organizations() {
            const rights        = this.$store.getters['getRights']
            const organizations = this.$store.getters['dictionary/organizations/getOptions']
            const result        = []

            for (let organization of organizations) {
                const newOrganization = {
                    label: organization.label,
                    value: organization.value
                }

                if (organization.branches) {
                    const newBranches = []

                    for (let branch of organization.branches) {
                        const newBranch = {
                            label: branch.label,
                            value: branch.value
                        }

                        if (rights[branch.value] && rights[branch.value].view) {
                            newBranches.push(newBranch)
                        }

                    }

                    newOrganization.branches = newBranches
                }

                if ((rights[newOrganization.value] && rights[newOrganization.value].view) || (newOrganization.branches && newOrganization.branches.length)) {
                    result.push(newOrganization)
                }
            }

            return result
        },
        branches() {
            return this.organization && this.organization.branches && this.organization.branches.length > 0 && this.organization.branches || []
        }
    },
    mounted() {
        const rights          = this.$store.getters['getRights']
        const organizationsID = Object.keys(rights)

        if (organizationsID.length === 1) {
            const organizationID = organizationsID[0]

            for (let organization of this.organizations) {
                if (organization.value.toString() === organizationID) {
                    this.actualOrganization = organization
                    return
                }

                for (let branch of organization.branches) {
                    if (branch.value.toString() === organizationID) {
                        this.actualOrganization = branch
                        return
                    }
                }
            }
        }
    },
    watch: {
        organization(val) {
            this.branch = null
        }
    }
}
</script>
