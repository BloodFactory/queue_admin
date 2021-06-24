<template>
    <q-card class="shadow-0" square>
        <q-card-section>
            <div class="row items-center">
                <div style="">
                    <span class="q-mr-sm text-grey" style="width: 21px">{{ index }}.</span><span>{{ item.name }}</span>
                </div>
                <q-space/>
                <q-btn
                    icon="more_vert"
                    flat dense round
                >
                    <q-menu>
                        <q-list>
                            <q-item clickable v-close-popup @click="$store.dispatch('dialogs/service/open', {service: item})">
                                <q-item-section avatar>
                                    <q-icon name="edit"/>
                                </q-item-section>
                                <q-item-section>Редактировать</q-item-section>
                            </q-item>
                            <q-separator/>
                            <q-item clickable v-close-popup @click="deleteItem">
                                <q-item-section avatar>
                                    <q-icon name="delete"/>
                                </q-item-section>
                                <q-item-section>Удалить</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    props: [
        'item',
        'index'
    ],
    methods: {
        deleteItem() {
            this.$q.dialog({
                title: 'Удаление записи',
                message: `Удалить запись "${this.item.name}"`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `services/${this.item.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        return Promise.all([
                            this.$store.dispatch('services/fetch'),
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
