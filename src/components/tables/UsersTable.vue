<template>
    <q-table :columns="columns"
             :data="data"
             title="Пользователи">
        <template v-slot:top-right>
            <q-btn color="primary"
                   icon-right="mdi-plus"
                   label="Создать"
                   no-caps
                   @click="addUser"/>
        </template>

        <template v-slot:body="props">
            <UsersTableRow :props="props"/>
        </template>
    </q-table>
</template>

<script>
import UsersTableRow from "components/tables/UsersTableRow";

export default {
    name: "UsersTable",
    components: {
        UsersTableRow
    },
    data() {
        return {
            columns: [
                {name: 'index', label: '#', field: 'index', sortable: false, align: 'right'},
                {name: 'username', label: 'Имя пользователя', field: 'username', sortable: true, align: 'left'},
                {name: 'fio', label: 'ФИО', field: 'fio', sortable: true, align: 'left'},
                {name: 'organization', label: 'Организация', field: 'organization', sortable: true, align: 'left'},
                {name: 'actions', label: 'Действия', field: 'actions', align: 'left'}
            ],
            data: []
        }
    },
    methods: {
        addUser() {
            this.$emit('openUserDialog', null)
        },
        loadUsers() {
            this.loading = true;

            this.$api({
                url: '/users',
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
        openUser(id) {
            this.$emit('openUserDialog', id)
        },
    }
}
</script>
