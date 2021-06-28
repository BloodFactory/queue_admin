<template>
    <div>
        <q-separator/>
        <div class="q-pa-lg">
            <div class="text-subtitle text-bold text-grey-7 q-mb-lg">Кандидаты на приём</div>

            <q-table
                :columns="columns"
                :data="registrations"
            >
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn
                            label="Удалить"
                            color="red"
                            size="sm"
                            class="no-border-radius"
                            unelevated
                            @click="deleteRecord(props.row.id)"
                        />
                    </q-td>
                </template>
            </q-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {name: 'lastName', field: 'lastName', label: 'Фамилия'},
                {name: 'firstName', field: 'firstName', label: 'Имя'},
                {name: 'middleName', field: 'middleName', label: 'Отчество'},
                {name: 'birthday', field: 'birthday', label: 'Дата рождения', headerStyle: 'width: 120px;'},
                {name: 'time', field: 'time', label: 'Время', headerStyle: 'width: 100px;'},
                {name: 'email', field: 'email', label: 'Почта'},
                {name: 'phone', field: 'phone', label: 'Телефон'},
                {name: 'actions'}
            ]
        }
    },
    computed: {
        registrations() {
            return this.$store.getters['pages/appointment/appointment/getRegistrations']
        }
    },
    methods: {
        deleteRecord(id) {
            this.$q.dialog({
                title: 'Подтвердите действие',
                message: 'Удалить запись?',
                cancel: 'Отмена'
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: './requests/' + id,
                    method: 'delete'
                }).then(() => {
                    return Promise.all([
                        this.$store.dispatch('pages/appointment/appointment/fetchRegistrations'),
                        this.$store.dispatch('pages/appointment/list/fetchList')
                    ])
                }).finally(() => {
                    this.$q.loading.hide()
                })
            })
        }
    }
}
</script>
