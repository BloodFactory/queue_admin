<template>
    <q-card>
        <q-card-section class="flex flex-center">
            <div class="text-h6 q-mb-md">Организации</div>

            <q-space/>

            <div class="flex justify-between">
                <q-btn color="primary"
                       icon-right="mdi-plus"
                       label="Добавить"
                       no-caps
                       @click="addOrganization"/>
            </div>
        </q-card-section>

        <q-card-section>
            <q-list>
                <OrganizationItem v-for="organization in organizations"
                                  :key="organization.id"
                                  :item="organization"
                                  @openOrganization="openOrganization"
                                  @deleteOrganization="deleteOrganization"/>
            </q-list>
        </q-card-section>
    </q-card>
</template>

<script>
import OrganizationItem from "./OrganizationItem";

export default {
    name: "OrganizationsTable",
    components: {
        OrganizationItem
    },
    data() {
        return {
            columns: [
                {name: 'index', label: '#', field: 'index', sortable: false, align: 'right'},
                {name: 'name', label: 'Название', field: 'name', sortable: false, align: 'left'},
                {name: 'actions', label: '', field: 'actions'}
            ],
            data: [],
            page: 1,
            pages: 0,
            limit: 5,
            itemsPerPages: [
                5,
                10,
                15,
                30
            ]
        }
    },
    computed: {
        organizations() {
            return this.$store.getters['dictionary/organizations/getOptions'];
        }
    },
    methods: {
        addOrganization() {
            this.$emit('openOrganizationDialog', null)
        },
        fetchList(props) {
            this.$q.loading.show();
            const params = {};

            params.page  = this.page;
            params.limit = this.limit;

            return this.$api({
                url: 'organizations',
                method: 'get',
                params
            }).then(response => {
                this.data  = response.data.data;
                this.pages = Math.ceil(response.data.count / this.limit);
            }).catch(error => {
                this.$q.notify({
                    message: 'Не удалось загрузить данные',
                    type: 'negative',
                    position: 'top'
                });
            }).finally(() => {
                this.$q.loading.hide();
            });
        },
        openOrganization(id) {
            this.$emit('openOrganizationDialog', id)
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
                const items = this.data.length;

                this.$api({
                    url: '/organizations/' + id,
                    method: 'delete'
                }).then(() => {
                    if (1 === items && this.page > 1) {
                        this.page = this.page - 1;
                    }
                    this.fetchList()
                });
            });
        }
    }
}
</script>
