<template>
    <q-card>
        <q-card-section>
            <div class="row q-gutter-x-md">
                <div style="width: 24px">
                    <q-btn v-if="null === services || services.length > 0"
                           :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
                           color="purple"
                           size="xs"
                           round
                           unelevated
                           @click="toggle"/>
                </div>

                <div>
                    {{ servicesGroup.index }}. {{ servicesGroup.name }}
                </div>

                <q-space/>

                <div class="row q-gutter-x-md">
                    <q-btn
                        v-if="$can('add', 'Services')"
                        label="Добавить услугу"
                        icon="mdi-plus"
                        color="purple"
                        size="sm"
                        class="no-border-radius"
                        unelevated
                        @click="$refs.serviceDialog.show(servicesGroup.id)"
                    />

                    <q-btn
                        v-if="$can('update', 'Services')"
                        label="Редактировать"
                        icon="mdi-pencil"
                        color="green"
                        size="sm"
                        class="no-border-radius"
                        unelevated
                        @click="$emit('edit')"
                    />

                    <q-btn
                        v-if="$can('delete', 'Services')"
                        label="Удалить"
                        icon="mdi-delete"
                        color="red"
                        size="sm"
                        class="no-border-radius"
                        unelevated
                        @click="deleteItem"
                    />
                </div>
            </div>
        </q-card-section>

        <q-slide-transition>
            <div v-show="expanded">
                <q-card-section class="q-pt-lg">
                    <q-list>
                        <q-item-label header>Услуги</q-item-label>
                        <template v-for="(service, index) in filterServices">
                            <q-item>
                                <q-item-section side>
                                    <q-item-label>{{ service.index }}</q-item-label>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>{{ service.name }}</q-item-label>
                                </q-item-section>

                                <q-item-section top side>
                                    <div class="q-gutter-md">
                                        <q-btn
                                            label="Редактировать"
                                            icon="mdi-pencil"
                                            color="green"
                                            class="no-border-radius"
                                            size="sm"
                                            unelevated
                                        />
                                        <q-btn
                                            label="Удалить"
                                            icon="mdi-delete"
                                            color="red"
                                            class="no-border-radius"
                                            size="sm"
                                            unelevated
                                            @click="deleteService(service)"
                                        />
                                    </div>
                                </q-item-section>

                            </q-item>

                            <q-separator v-if="index < services.length - 1"/>
                        </template>
                    </q-list>
                </q-card-section>
            </div>
        </q-slide-transition>

        <ServiceDialog ref="serviceDialog" @save="fetchServices"/>
    </q-card>

</template>

<script>
import ServiceDialog from './ServiceDialog'

export default {
    props: ['servicesGroup'],
    components: {ServiceDialog},
    data() {
        return {
            expanded: false,
            services: null
        }
    },
    computed: {
        filter() {
            return this.$store.getters['pages/services/getFilter']
        },
        filterServices() {
            if (null === this.services) return null

            return this.services.filter(service => !this.filter || service.name.includes(this.filter))
        }
    },
    methods: {
        fetchServices() {
            let innerLoading = false;

            if (!this.$q.loading.isActive) {
                innerLoading = true
                this.$q.loading.show()
            }

            return this.$api({
                url: '/services',
                method: 'get',
                params: {
                    servicesGroupID: this.servicesGroup.id
                }
            })
                .then(response => {
                    this.services = response.data

                    return Promise.resolve()
                })
                .finally(() => {
                    if (innerLoading) this.$q.loading.hide()
                })
        },
        toggle() {
            if (null === this.services) {
                this.fetchServices()
                    .then(() => {
                        if (this.services && this.services.length > 0)
                            this.expanded = !this.expanded
                    })
            } else {
                this.expanded = !this.expanded
            }
        },
        deleteItem() {
            this.$q.dialog({
                title: 'Удаление записи',
                message: `Удалить запись ${this.servicesGroup.name}`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `servicesGroups/${this.servicesGroup.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        this.$store.dispatch('pages/services/fetchServicesGroups').then(() => {
                            this.$q.loading.hide()
                        })
                    })
                    .catch(error => {
                        this.$q.loading.hide()

                        this.$q.notify({
                            message: error.response.data,
                            type: 'negative',
                            position: 'top'
                        })
                    })
            })

        },
        deleteService(service) {
            this.$q.dialog({
                title: 'Удаление записи',
                message: `Удалить запись ${service.name}`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `services/${service.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        this.fetchServices().then(() => {
                            this.$q.loading.hide()
                        })
                    })
                    .catch(error => {
                        this.$q.loading.hide()

                        this.$q.notify({
                            message: error.response.data,
                            type: 'negative',
                            position: 'top'
                        })
                    })
            })
        }
    }
}
</script>
