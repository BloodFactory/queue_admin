<template>
    <q-card class="shadow-0" square>
        <q-card-section>
            <div class="row q-gutter-x-md">
                <div style="width: 24px">
                    <q-btn
                        v-if="organization.branches.length > 0"
                        :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
                        color="purple"
                        size="sm"
                        dense unelevated flat
                        @click="expanded = !expanded"
                    />
                </div>

                <div>
                    {{ organization.index }}. {{ organization.name }}
                </div>

                <q-space/>

                <div class="row q-gutter-x-md">
                    <q-btn
                        v-if="$can('add', 'Organizations')"
                        label="Добавить филиал"
                        icon="mdi-plus"
                        color="purple"
                        size="sm"
                        class="no-border-radius"
                        unelevated
                        @click="$store.dispatch('dialogs/organizationBranch/open',{organizationId: organization.id})"
                    />

                    <q-btn
                        v-if="$can('update', 'Organizations')"
                        label="Редактировать"
                        icon="mdi-pencil"
                        color="green"
                        size="sm"
                        class="no-border-radius"
                        unelevated
                        @click="$store.dispatch('dialogs/organization/open', {organization})"
                    />

                    <q-btn
                        v-if="$can('delete', 'Organizations')"
                        label="Удалить"
                        icon="mdi-delete"
                        color="red"
                        size="sm"
                        class="no-border-radius"
                        unelevated
                        @click="deleteItem"
                    />
                </div>
            </div>
        </q-card-section>

        <template v-if="organization.branches && organization.branches.length > 0">
            <q-slide-transition>
                <div v-show="expanded" style="padding-left: 30px;">
                    <BranchesList :branches="organization.branches"/>
                </div>
            </q-slide-transition>
        </template>
    </q-card>
</template>

<script>
export default {
    props: ['organization'],
    components: {
        BranchesList: () => import('./BranchesList')
    },
    data() {
        return {
            expanded: false
        }
    },
    methods: {
        deleteItem() {
            this.$q.dialog({
                title: 'Удаление записи',
                message: `Удалить запись ${this.organization.name}`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `organizations/${this.organization.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        return Promise.all([
                            this.$store.dispatch('pages/organizations/fetchOrganizations'),
                            this.$store.dispatch('dictionary/organizations/fetchOptions')
                        ])
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
            })
        }
    }
}
</script>
