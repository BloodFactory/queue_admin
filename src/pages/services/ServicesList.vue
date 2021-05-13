<template>
    <q-card-section class="q-pt-lg">
        <q-list>
            <q-item-label header>Услуги</q-item-label>
            <template v-for="(service, index) in services">
                <ServiceItem :service="service" @edit="service => {$emit('edit', service)}"/>

                <q-separator v-if="index < services.length - 1"/>
            </template>
        </q-list>
    </q-card-section>
</template>

<script>
import ServiceItem from './ServiceItem'

export default {
    props: ['services'],
    components: {
        ServiceItem
    }
}
</script>
