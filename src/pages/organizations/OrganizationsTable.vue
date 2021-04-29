<template>
    <q-table ref="table"
             :columns="columns"
             :data="data"
             title="Организации"
             :loading="loading"
             rows-per-page-label="Записей на странице:"
             :pagination-label="paginationLabel"
             :pagination.sync="pagination"
             @request="fetchList">
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
                {name: 'name', label: 'Название', field: 'name', sortable: false, align: 'left'},
                {name: 'actions', label: '', field: 'actions'}
            ],
            data: [],
            pagination: {
                rowsNumber: 0
            }
        }
    },
    methods: {
        paginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
            return `${firstRowIndex} - ${endRowIndex} из ${totalRowsNumber}`;
        },
        addOrganization() {
            this.$emit('openOrganizationDialog', null)
        },
        loadOrganizations() {
            this.$refs.table.requestServerInteraction();
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
        },
        fetchList({filter, pagination}) {
            this.loading = true;

            const params = {};

            if (filter) params.filter = filter;

            params.page  = pagination.page;
            params.limit = pagination.rowsPerPage;

            this.$api({
                url: 'organizations',
                method: 'get',
                params
            }).then(response => {
                pagination.rowsNumber = response.data.count;

                this.data       = response.data.data;
                this.pagination = pagination;
            }).catch(error => {
                this.$q.notify({
                    message: 'Не удалось загрузить данные',
                    type: 'negative',
                    position: 'top'
                });
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>
