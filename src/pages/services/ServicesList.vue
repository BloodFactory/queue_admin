<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-xs">
            <div class="text-subtitle1">Группы</div>
            <template v-if="services.children && services.children.length">
                <GroupItem
                    v-for="(item, index) in services['children']"
                    :key="item.id"
                    :item="item"
                    :index="index + 1"
                />
            </template>
            <template v-else>
                <q-card square>
                    <q-card-section>
                        В списке отсутствуют группы услуг
                    </q-card-section>
                </q-card>
            </template>

            <div class="q-mt-lg">
                <div class="text-subtitle1">Услуги</div>
                <template v-if="services.services && services.services.length > 0">
                    <div class="column q-gutter-y-xs">
                        <ServiceItem
                            v-for="(service, serviceIndex) in services.services"
                            :key="service.id"
                            :item="service"
                            :index="serviceIndex + 1"
                        />
                    </div>
                </template>
                <template v-else>
                    <q-card square>
                        <q-card-section>
                            В списке отсутствуют услуги
                        </q-card-section>
                    </q-card>
                </template>
            </div>
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
            const filter               = this.$store.getters['pages/services/getFilter']
            const {children, services} = this.$store.getters['services/getServices']

            if (!filter) {
                return {
                    children,
                    services
                }
            }

            const childrenResult = filterChildren(children)
            const servicesResult = filterServices(services)

            function filterChildren(items) {
                const filteredItems = []

                for (let item of items) {
                    let filteredServices = []
                    let filteredChildren = []

                    if (item.hasOwnProperty('services') && item.services.length) {
                        filteredServices = filterServices(item.services)
                    }

                    if (item.hasOwnProperty('children') && item.children.length) {
                        filteredChildren = filterChildren(item.children)
                    }

                    if (item.name.includes(filter)) {
                        filteredItems.push(item)
                        continue
                    }

                    if (filteredServices.length || filteredChildren.length) {
                        let newItem = {}
                        Object.assign(newItem, item)
                        newItem.services = filteredServices
                        newItem.children = filteredChildren
                        filteredItems.push(newItem)
                    }
                }

                return filteredItems
            }

            function filterServices(items) {
                const filteredItems = []

                for (let item of items) {
                    if (item.name.includes(filter)) {
                        const newItem = {}
                        Object.assign(newItem, item)
                        filteredItems.push(newItem)
                    }
                }

                return filteredItems
            }

            return {
                children: childrenResult,
                services: servicesResult
            }
        }
    }
}
</script>
