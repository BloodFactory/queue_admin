<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-xs">
            <div class="text-subtitle1">Группы</div>
            <GroupItem
                v-for="(item, index) in services['children']"
                :key="item.id"
                :item="item"
                :index="index + 1"
            />

            <template v-if="services.services && services.services.length > 0">
                <div class="text-subtitle1">Услуги</div>
                <div class="column q-gutter-y-xs">
                    <ServiceItem
                        v-for="(service, serviceIndex) in services.services"
                        :key="service.id"
                        :item="service"
                        :index="serviceIndex + 1"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        GroupItem: () => import ('./GroupItem'),
        ServiceItem: () => import('./ServiceItem')
    },
    computed: {
        services() {
            return this.$store.getters['services/getServices']
        }
    }
}
</script>
