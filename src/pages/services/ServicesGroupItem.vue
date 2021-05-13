<template>
    <q-card>
        <q-card-section>
            <div class="row q-gutter-x-md">
                <div style="width: 24px">
                    <q-btn
                        v-if="servicesGroup.services.length > 0"
                        :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
                        color="purple"
                        size="xs"
                        round
                        unelevated
                        @click="expanded = !expanded"
                    />
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

        <template v-if="servicesGroup.services.length > 0">
            <q-slide-transition>
                <div v-show="expanded" style="padding-left: 30px;">
                    <ServicesList :services="servicesGroup.services" @edit="service => {$refs.serviceDialog.show(servicesGroup.id, service)}"/>
                </div>
            </q-slide-transition>
        </template>

        <ServiceDialog ref="serviceDialog"/>
    </q-card>

</template>

<script>
import ServiceDialog from './ServiceDialog'
import ServicesList  from './ServicesList'

export default {
    props: ['servicesGroup'],
    components: {
        ServiceDialog,
        ServicesList
    },
    data() {
        return {
            expanded: false,
        }
    },
    methods: {

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
                        this.$store.dispatch('pages/services/fetchServices').then(() => {
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
