<template>
    <q-item>
        <q-item-section side>
            <q-item-label>{{ branch.index }}</q-item-label>
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ branch.name }}</q-item-label>
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
                    @click="$emit('edit', branch)"
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
    props: ['branch'],
    methods: {
        deleteItem() {
            this.$q.dialog({
                title: 'Удаление записи',
                message: `Удалить запись ${this.branch.name}`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `organizations/${this.branch.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        return Promise.all([
                            this.$store.dispatch('pages/organizations/fetchOrganizations'),
                            this.$store.dispatch('dictionary/organizations/fetchOptions')
                        ])
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
            })
        }
    }
}
</script>
