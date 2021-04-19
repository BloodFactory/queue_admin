<template>
    <q-table :columns="columns"
             :data="data"
             title="Организации"
             :loading="loading">
        <template v-if="$can('add', 'Organizations')" v-slot:top-right>
            <q-btn color="primary"
                   icon-right="mdi-plus"
                   label="Добавить"
                   no-caps
                   @click="addOrganization"/>
        </template>

        <template v-slot:body-cell-index="cell">
            <q-td auto-width>
                {{ cell.value }}
            </q-td>
        </template>

        <template v-slot:body-cell-actions="cell">
            <q-td auto-width>
                <q-btn v-if="$can('update', 'Organizations')"
                       color="primary"
                       icon="mdi-pencil"
                       size="sm"
                       flat
                       round
                       @click="openOrganization(cell.row.id)"/>
                <q-btn v-if="$can('delete', 'Organizations')"
                       color="red"
                       icon="mdi-delete"
                       size="sm"
                       flat
                       round
                       @click="deleteOrganization(cell.row.id)"/>
            </q-td>
        </template>
    </q-table>
</template>

<script>
export default {
    name: "OrganizationsTable",
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
        addOrganization() {
            this.$emit('openOrganizationDialog', null)
        },
        loadOrganizations() {
            this.loading = true;

            this.$api({
                url: 'organizations',
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
        deleteOrganization(id) {
            this.$q.dialog({
                title: 'Подтвердите действие',
                message: 'Удалить выбранную запись',
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
                    url: '/organizations/' + id,
                    method: 'delete'
                }).then(() => {
                    this.loadOrganizations()
                });
            });
        },
        openOrganization(id) {
            this.$emit('openOrganizationDialog', id)
        }
    }
}
</script>
