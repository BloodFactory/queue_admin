<template>
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
                    @click="$emit('edit', service)"
                />
                <q-btn
                    label="Удалить"
                    icon="mdi-delete"
                    color="red"
                    class="no-border-radius"
                    size="sm"
                    unelevated
                    @click="deleteItem"
                />
            </div>
        </q-item-section>

    </q-item>
</template>

<script>
export default {
    props: ['service'],
    methods: {
        deleteItem() {
            this.$q.dialog({
                title: 'Удаление записи',
                message: `Удалить запись ${this.service.name}`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `services/${this.service.id}`,
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
