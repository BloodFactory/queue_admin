<template>
    <q-page :class="darkMode || 'bg-grey-4'">
        <q-toolbar :class="($q.dark.isActive ? 'bg-cyan-10' : 'bg-white') + ' shadow-1 q-py-md'">
            <div class="text-h6">Удалённая запись на приём</div>
            <q-space/>
            <q-btn label="Добавить" color="primary" class="no-border-radius" @click="$refs.serviceDialog.show(null)" unelevated/>
        </q-toolbar>

        <OrganizationService v-for="organizationService in organizationServices" :key="organizationService.id" :organizationService="organizationService"/>

        <q-inner-loading :showing="loading">
            <q-spinner-hourglass size="50px" color="primary"/>
        </q-inner-loading>

        <ServiceDialog ref="serviceDialog" @save="loadServicesList()"/>
    </q-page>
</template>

<script>
import ServiceDialog       from './ServiceDialog';
import OrganizationService from "./OrganizationService";

export default {
    name: "ClientHomepage",
    components: {
        ServiceDialog,
        OrganizationService
    },
    data() {
        return {
            organizationServices: [],
            showOld: false,
            loading: false
        }
    },
    computed: {
        darkMode() {
            return this.$store.getters['getDarkMode'];
        }
    },
    methods: {
        loadServicesList() {
            this.loading = true;

            this.$api({
                url: '/organization_services',
                method: 'get'
            }).then(response => {
                this.organizationServices = response.data
            }).finally(() => {
                this.loading = false;
            });
        },
        deleteOrganizationService(id) {
            this.$q.dialog({
                title: 'Подтвердите действие',
                message: 'Удалить выбраную запись?',
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$api({
                    url: '/organization_services/' + id,
                    method: 'DELETE'
                }).then(() => {
                    this.loadServicesList();
                });
            });
        }
    },
    mounted() {
        this.loadServicesList();
    }
}
</script>
