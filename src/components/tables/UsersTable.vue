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
            <q-tr :props="props" :class="props.row.isActive ? '' : 'bg-deep-orange-1'">
                <q-td auto-width>
                    {{ props.row.index }}
                </q-td>
                <q-td>
                    {{ props.row.username }}
                </q-td>
                <q-td>
                    {{ props.row.fio }}
                </q-td>
                <q-td>
                    {{ props.row.organization }}
                </q-td>
                <q-td auto-width>
                    <q-btn v-if="$can('toggle', 'Users')"
                           :color="props.row.isActive ? 'green-7' : 'red'"
                           :icon="props.row.isActive ? 'mdi-lock-open-variant' : 'mdi-lock'"
                           :loading="props.row.loadToggle"
                           size="sm"
                           flat
                           round
                           @click="toggleUserActivity(props.row, props.rowIndex)"/>
                    <q-btn v-if="$can('update', 'Users')"
                           color="primary"
                           icon="mdi-pencil"
                           size="sm"
                           flat
                           round
                           @click="openUser(props.row.id)"/>
                    <q-btn v-if="$can('delete', 'Users')"
                           color="red"
                           icon="mdi-delete"
                           size="sm"
                           flat
                           round
                           @click="deleteUser(props.row.id)"/>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
export default {
    name: "UsersTable",
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
                url: 'users',
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
        deleteUser(id) {
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
                    url: '/users/' + id,
                    method: 'delete'
                }).then(() => {
                    this.loadUsers()
                });
            });
        },
        openUser(id) {
            this.$emit('openUserDialog', id)
        },
        toggleUserActivity(row, index) {
            if (row.loadToggle) return;

            row.loadToggle = true;

            this.$api({
                url: '/users/' + row.id + '/toggle',
                method: 'post'
            }).then(response => {
                row.loadToggle = false;
                this.data[index]['isActive'] = !this.data[index]['isActive'];
            }).catch(error => {
                row.loadToggle = false;

                this.$q.notify({
                    message: 'Не удалось выполнить запрос',
                    type: 'negative',
                    position: 'top'
                });
            });
        }
    }
}
</script>
