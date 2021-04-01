<template>
    <q-table title="Настройки электронных очередей"
             :columns="columns"
             :data="data">
        <template v-slot:top-right>
            <q-btn label="Добавить" icon="mdi-plus" color="primary" @click="addSettings"/>
        </template>

        <template v-slot:body="props">
            <q-tr :props="props" :class="props.row.isActive ? '' : 'bg-deep-orange-1'">
                <q-td auto-width>
                    {{ props.row.index }}
                </q-td>
                <q-td>
                    {{ props.row.name }}
                </q-td>
                <q-td auto-width>
                    <q-btn v-if="$can('toggle', 'Settings')"
                           :color="props.row.isActive ? 'green-7' : 'red'"
                           :icon="props.row.isActive ? 'mdi-lock-open-variant' : 'mdi-lock'"
                           :loading="props.row.loadToggle"
                           size="sm"
                           flat
                           round
                           @click="toggleServiceActivity(props.row, props.rowIndex)"/>
                    <q-btn v-if="$can('update', 'Settings')"
                           color="primary"
                           icon="mdi-pencil"
                           size="sm"
                           flat
                           round
                           @click="openService(props.row.id)"/>
                    <q-btn v-if="$can('delete', 'Settings')"
                           color="red"
                           icon="mdi-delete"
                           size="sm"
                           flat
                           round
                           @click="deleteService(props.row.id)"/>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
export default {
    name: "SettingsTable",
    data() {
        return {
            columns: [
                {name: 'index', label: '#', field: 'index', sortable: false, align: 'right'},
                {name: 'name', label: 'Название', field: 'name', sortable: true, align: 'left'},
                {name: 'actions', label: 'Действия', field: 'actions', align: 'left'}
            ],
            data: []
        }
    },
    methods: {
        addSettings() {
            this.$emit('openSettingsDialog', null)
        },
        fetchList() {
            this.$api({
                url: '/settings',
                method: 'get'
            }).then(response => {
                this.data = response.data
            });
        },
        deleteService(id) {
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
                    url: '/settings/' + id,
                    method: 'delete'
                }).then(() => {
                    this.fetchList()
                });
            });
        },
        openService(id) {
            this.$emit('openSettingsDialog', id)
        },
        toggleServiceActivity(row, index) {
            if (row.loadToggle) return;

            row.loadToggle = true;

            this.$api({
                url: '/settings/' + row.id + '/toggle',
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
