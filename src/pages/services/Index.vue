<template>
    <q-page>
        <q-toolbar :class="(darkMode ? 'bg-grey-10' : 'bg-white') + ' shadow-1 q-py-md'">
            <q-toolbar-title>Справочник услуг</q-toolbar-title>

            <q-input
                v-model.trim="filter"
                class="q-px-md q-mr-md no-border-radius bg-grey-3"
                prefix="Поиск:"
                debounce="500"
                dense borderless clearable
            >
                <template v-slot:prepend>
                    <q-icon name="mdi-magnify"/>
                </template>
            </q-input>

            <q-btn
                label="Добавить"
                icon="mdi-plus"
                color="purple"
                class="no-border-radius"
                unelevated
                @click="$refs.serviceDialog.show()"
            />
        </q-toolbar>

        <div class="q-pa-lg">
            <q-table
                ref="table"
                :columns="columns"
                :data="services"
                :pagination.sync="pagination"
                :filter="filter"
                @request="onRequest"
            >
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <div class="row">
                            <div class="col">
                                <q-btn
                                    v-if="$can('update', 'Services')"
                                    label="Редактировать"
                                    size="sm"
                                    color="primary"
                                    class="no-border-radius"
                                    unelevated
                                    @click="$refs.serviceDialog.show(props.row)"
                                />
                            </div>
                            <div class="col">
                                <q-btn
                                    v-if="$can('delete', 'Services')"
                                    label="Удалить"
                                    size="sm"
                                    color="red"
                                    class="no-border-radius"
                                    unelevated
                                    @click="deleteService(props)"
                                />
                            </div>
                        </div>
                    </q-td>
                </template>
            </q-table>
        </div>

        <ServiceDialog ref="serviceDialog" @save="reload"/>
    </q-page>
</template>

<script>
import ServiceDialog from "./ServiceDialog";
import {api}         from "boot/axios";

export default {
    data() {
        return {
            loading: false,
            columns: [
                {name: 'index', label: '#', field: 'index', headerStyle: 'width: 50px'},
                {name: 'name', label: 'Название', field: 'name', align: 'left'},
                {name: 'actions', label: 'Действия', headerStyle: 'width: 240px'}
            ],
            pagination: {
                page: 1,
                rowsNumber: 0,
                sortBy: null,
                rowsPerPage: 10,
                descending: false
            },
            filter: '',
            services: []
        }
    },
    components: {
        ServiceDialog
    },
    computed: {
        darkMode() {
            return this.$q.dark.isActive
        }
    },
    methods: {
        openServiceDialog(id) {
            this.$refs.serviceDialog.show(id)
        },
        onRequest(props) {
            if (this.loading) return

            this.$q.loading.show()

            this.loading              = true
            const {page, rowsPerPage} = props.pagination
            const filter              = props.filter

            const params = {}

            if (page > 1) params.page = page
            if (10 !== rowsPerPage) params.limit = rowsPerPage
            if (filter) params.filter = filter

            api({
                url: 'services',
                method: 'get',
                params
            })
                .then(response => {
                    const {data, count} = response.data

                    this.pagination = {
                        page: page,
                        rowsNumber: count,
                        sortBy: 1,
                        rowsPerPage: rowsPerPage,
                        descending: 1
                    }

                    this.services = data


                    this.$router.push({
                        query: params
                    }).catch(() => {
                    })
                })
                .catch(error => {
                    return Promise.reject(error)
                })
                .finally(() => {
                    this.loading = false
                    this.$q.loading.hide()
                })
        },
        deleteService(props) {
            this.$q.dialog({
                title: 'Подтвердите действие',
                message: `Удалить "${props.row.name}"?`,
                persistent: true,
                cancel: 'Отмена'
            }).onOk(() => {
                this.$q.loading.show()
                this.$api({
                    url: `/services/${props.row.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        this.onRequest({
                            pagination: this.pagination,
                            filter: this.filter
                        })
                    })
                    .catch(error => {
                        this.$q.notify({
                            message: error.response.data,
                            type: 'negative',
                            position: 'top'
                        })
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
            })
        },
        reload() {
            this.onRequest({
                pagination: this.pagination,
                filter: this.filter
            })
        }
    },
    mounted() {
        const {page, limit, filter} = this.$route.query

        this.pagination.page        = page || 1
        this.pagination.rowsPerPage = limit || 10
        this.filter                 = filter || ''

        this.onRequest({
            pagination: this.pagination,
            filter: this.filter
        })
    }
}
</script>
