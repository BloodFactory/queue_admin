<template>
    <q-page class="bg-grey-4">
        <q-toolbar class="bg-white shadow-1 q-py-md">
            <q-toolbar-title>
                Организации
            </q-toolbar-title>

            <q-btn label="Добавить"
                   color="primary"
                   class="no-border-radius"
                   unelevated
                   @click="openOrganizationDialog"/>
        </q-toolbar>

        <OrganizationItem v-for="(organization, index) in organizations"
                          :key="index"
                          :organization="organization"/>

        <OrganizationDialog ref="organizationDialog"/>
    </q-page>
</template>

<script>
import OrganizationDialog from "./OrganizationDialog";
import OrganizationItem   from "./OrganizationItem";

export default {
    components: {OrganizationDialog, OrganizationItem},
    data() {
        return {
            organizations: [
                {
                    label: 'ФГБУ Администрация морских портов Азовского моря',
                    branches: [
                        {label: 'служба капитана морского порта Таганрог'},
                        {label: 'служба капитана морского порта Темрюк'},
                        {label: 'служба капитана морского порта Ейск'},
                    ]
                },
                {
                    label: 'ФГБУ Администрация морских портов Балтийского моря',
                    branches: [
                        {label: 'служба капитана морского порта Санкт-Петербург'},
                        {label: 'служба капитана морского порта Калининград'},
                    ]
                },
                {
                    label: 'ФГБУ Администрация морских портов Западной Арктики',
                    branches: [
                        {label: 'служба капитана морского порта Архангельск'},
                        {label: 'служба капитана морского порта Мурманск'},
                    ]
                },
                {
                    label: 'ФГБУ Администрация морских портов Каспийского моря',
                    branches: [
                        {label: 'служба капитана морского порта Астрахань'},
                        {label: 'служба капитана морского порта Махачкала'},
                    ]
                },
                {
                    label: 'ФГБУ Администрация морских портов Охотского моря и Татарского пролива',
                    branches: [
                        {label: 'служба капитана морского порта Ванино'},
                        {label: 'служба капитана морского порта Магадан'},
                    ]
                },
                {
                    label: 'ФГБУ Администрация морских портов Приморского края и Восточной Арктики',
                    branches: [
                        {label: 'служба капитана морского порта Владивосток'},
                        {label: 'служба капитана морского порта Находка'},
                        {label: 'служба капитана морского порта Тикси'},
                    ]
                },
                {
                    label: 'ФГБУ Администрация морских портов Сахалина, Курил и Камчатки',
                    branches: [
                        {label: 'служба капитана морского порта Корсаков'},
                        {label: 'служба капитана морского порта Невельск'},
                        {label: 'служба капитана морского порта Петропавловск-Камчатский'},
                        {label: 'служба капитана морского порта Поронайск'},
                        {label: 'служба капитана морского порта Холмск'},
                    ]
                },
                {
                    label: 'ФГБУ Администрация морских портов Черного моря',
                    branches: [
                        {label: 'служба капитана морского порта Новороссийск'},
                        {label: 'служба капитана морского порта Туапсе'},
                        {label: 'служба капитана морского порта Керчь'},
                        {label: 'служба капитана морского порта Севастополь'},
                        {label: 'служба капитана морского порта Сочи'},
                        {label: 'служба капитана морского порта Тамань'},
                        {label: 'служба капитана морского порта Феодосия'},
                        {label: 'служба капитана морского порта Ялта'},
                        {label: 'служба капитана морского порта Евпатория'},
                    ]
                },
            ]
        }
    },
    methods: {
        openOrganizationDialog() {
            this.$refs.organizationDialog.show();
        }
    }
}
</script>

<style lang="scss">
.add-branch i {
    font-size: 1.715em !important;
}
</style>
