<template>
    <div>
        <q-separator/>
        <div class="q-pa-lg">
            <div class="text-subtitle text-bold text-grey-7 q-mb-lg">Кандидаты на приём</div>

            <q-table
                :columns="columns"
                :data="registrations"
            />
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
                {name: 'birthday', field: 'birthday', label: 'Дата рождения'},
                {name: 'time', field: 'time', label: 'Время'},
                {name: 'email', field: 'email', label: 'Почта'},
                {name: 'phone', field: 'phone', label: 'Телефон'},
            ]
        }
    },
    computed: {
        registrations() {
            return this.$store.getters['pages/appointment/appointment/getRegistrations']
        }
    }
}
</script>
