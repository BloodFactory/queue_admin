<template>
    <q-tr :props="props" :class="props.row.isActive ? '' : 'bg-deep-orange-1'">
        <q-td auto-width>
            {{ props.row.index }}
        </q-td>
        <q-td>
            {{ props.row.username }}
        </q-td>
        <q-td>
            {{
                [
                    props.row.userData.lastName,
                    props.row.userData.firstName,
                    props.row.userData.middleName,
                ].join(' ').trim()
            }}
        </q-td>
        <q-td>
            {{ props.row.organization }}
        </q-td>
        <q-td auto-width>
            <q-btn v-if="$can('toggle', 'Users')"
                   :color="props.row.isActive ? 'green-7' : 'red'"
                   :icon="props.row.isActive ? 'mdi-lock-open-variant' : 'mdi-lock'"
                   :loading="loading"
                   size="sm"
                   flat
                   round
                   @click="toggleUserActivity(props.row, props.rowIndex)"/>
            <q-btn v-if="$can('update', 'Users')"
                   color="primary"
                   icon="mdi-pencil"
                   size="sm"
                   :loading="loading"
                   flat
                   round
                   @click="openUser(props.row.id)"/>
            <q-btn v-if="$can('delete', 'Users')"
                   color="red"
                   icon="mdi-delete"
                   size="sm"
                   :loading="loading"
                   flat
                   round
                   @click="deleteUser(props.row.id)"/>
        </q-td>
    </q-tr>
</template>

<script>
export default {
    name: "UsersTableRow",
    props: ['props'],
    data() {
        return {
            loading: false
        }
    },
    methods: {
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
        toggleUserActivity(row, index) {
            if (this.loading) return;

            this.loading = true;

            this.$api({
                url: '/users/' + row.id + '/toggle',
                method: 'post'
            }).then(response => {
                this.props.row['isActive'] = !this.props.row['isActive'];
            }).catch(error => {

                row.loadToggle = false;

                this.$q.notify({
                    message: 'Не удалось выполнить запрос',
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
