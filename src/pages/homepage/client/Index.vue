<template>
    <q-page padding>
        <div class="row q-col-gutter-x-xl">
            <UserOrganizationsList v-model="organization"/>

            <div class="col" v-if="organization">
                <q-card>
                    <q-card-section>
                        <div class="text-h5">
                            {{ organization.label }}
                        </div>
                    </q-card-section>
                </q-card>
            </div>
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
