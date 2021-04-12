<template>
    <q-table :columns="columns"
             :data="data"
             title="Услуги"
             :loading="loading">
        <template v-if="$can('add', 'Services')" v-slot:top-right>
            <q-btn color="primary"
                   icon-right="mdi-plus"
                   label="Добавить"
                   no-caps
                   @click="$emit('openServiceDialog', null);"/>
        </template>

        <template v-slot:body-cell-index="cell">
            <q-td auto-width>
                {{ cell.value }}
            </q-td>
        </template>

        <template v-slot:body-cell-actions="cell">
            <q-td auto-width>
                <q-btn v-if="$can('update', 'Services')"
                       color="primary"
                       icon="mdi-pencil"
                       size="sm"
                       flat
                       round
                       @click="$emit('openServiceDialog', cell.row.id)"/>
                <q-btn v-if="$can('delete', 'Services')"
                       color="red"
                       icon="mdi-delete"
                       size="sm"
                       flat
                       round
                       @click="deleteServices(cell.row.id)"/>
            </q-td>
        </template>
    </q-table>
</template>

<script>
export default {
    name: "ServicesTable",
    data() {
        return {
            loading: false,
            columns: [
                {name: 'index', label: '#', field: 'index', sortable: false, align: 'right'},
                {name: 'name', label: 'Название', field: 'name', sortable: true, align: 'left'},
                {name: 'actions', label: '', field: 'actions'}
            ],
            data: []
        }
    },
    methods: {
        loadServices() {
            this.loading = true;

            this.$api({
                url: 'services',
                method: 'get'
            }).then(response => {
                this.data = response.data
            }).catch(error => {
                this.$q.notify({
                    message: 'Не удалось загрузить данные',
                    type: 'negative',
                    position: 'top'
                });
            }).finally(() => {
                this.loading = false;
            });
        },
        deleteServices(id) {
            this.$q.dialog({
                title: 'Подтвердите действие',
                message: 'Удалить выбранну запись',
                ok: {
                    flat: true,
                    color: 'green',
                    label: 'Подтвердить'
                },
                cancel: {
                    flat: true,
                    color: 'red',
                    label: 'Отмена'
                },
                persistent: true
            }).onOk(() => {
                this.$api({
                    url: '/services/' + id,
                    method: 'delete'
                }).then(() => {
                    this.loadServices()
                });
            });
        }
    }
}
</script>
