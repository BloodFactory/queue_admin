<template>
    <q-table ref="table"
             :columns="columns"
             :data="data"
             :loading="loading"
             title="Пользователи"
             rows-per-page-label="Записей на странице:"
             :pagination-label="paginationLabel"
             :pagination.sync="pagination"
             @request="fetchList">
        <template v-slot:top-right>
            <q-btn color="primary"
                   icon-right="mdi-plus"
                   label="Создать"
                   no-caps
                   @click="addUser"/>
        </template>

        <template v-slot:body="props">
            <UsersTableRow :props="props" @openUserDialog="(id) => {$emit('openUserDialog', id)}"/>
        </template>
    </q-table>
</template>

<script>
import UsersTableRow from "pages/users/UsersTableRow";

export default {
    name: "UsersTable",
    components: {
        UsersTableRow
    },
    data() {
        return {
            loading: false,
            columns: [
                {name: 'index', label: '#', field: 'index', sortable: false, align: 'right'},
                {name: 'username', label: 'Имя пользователя', field: 'username', sortable: true, align: 'left'},
                {name: 'fio', label: 'ФИО', field: 'fio', sortable: true, align: 'left'},
                {name: 'organization', label: 'Организация', field: 'organization', sortable: true, align: 'left'},
                {name: 'actions', label: 'Действия', field: 'actions', align: 'left'}
            ],
            data: [],
            pagination: {
                rowsNumber: 0
            }
        }
    },
    methods: {
        addUser() {
            this.$emit('openUserDialog', null)
        },
        loadUsers() {
            this.$refs.table.requestServerInteraction();
        },
        paginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
            return `${firstRowIndex} - ${endRowIndex} из ${totalRowsNumber}`;
        },
        fetchList({filter, pagination}) {
            this.loading = true;

            const params = {};

            if (filter) params.filter = filter;

            params.page  = pagination.page;
            params.limit = pagination.rowsPerPage;

            this.$api({
                url: 'users',
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
