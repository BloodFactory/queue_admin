<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-lg">
            <ServicesGroupItem
                v-for="(servicesGroup, index) in servicesGroupsList"
                :key="servicesGroup.id"
                :services-group="servicesGroup"
                @edit="$emit('edit', servicesGroup)"
            />
        </div>
    </div>
</template>

<script>
import ServicesGroupItem from "./ServicesGroupItem";

export default {
    components: {ServicesGroupItem},
    computed: {
        servicesGroupsList() {
            return this.$store.getters['pages/services/getServicesGroups'] || []
        }
    },
    methods: {
        fetchList() {
            this.$q.loading.show()

            this.$store.dispatch('pages/services/fetchServicesGroups')
                .finally(() => {
                    this.$q.loading.hide()
                })
        }
    },
    mounted() {
        if (null === this.$store.getters['pages/services/getServicesGroups']) {
            this.fetchList()
        }
    }
}
</script>
