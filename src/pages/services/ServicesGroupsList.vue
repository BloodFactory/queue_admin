<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-lg">
            <ServicesGroupItem
                v-for="(servicesGroup, index) in servicesGroups"
                :key="servicesGroup.id"
                :services-group="servicesGroup"
                @edit="$emit('edit', servicesGroup)"
            />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        ServicesGroupItem: () => import('./ServicesGroupItem')
    },
    computed: {
        servicesGroups() {
            return this.$store.getters['pages/services/getServices'] || []
        }
    },
    mounted() {
        if (null === this.$store.getters['pages/services/getServices']) {
            this.$q.loading.show()

            this.$store.dispatch('pages/services/fetchServices').then(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>
