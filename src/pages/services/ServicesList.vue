<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-xs">
            <ServiceItem
                v-for="service in services"
                :key="service.id"
                :service="service"
            />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        ServiceItem: () => import ('./ServiceItem')
    },
    computed: {
        services() {
            return this.$store.getters['pages/services/getServices']
        }
    },
    mounted() {
        this.$store.dispatch('pages/services/fetchServices')
    }
}
</script>
