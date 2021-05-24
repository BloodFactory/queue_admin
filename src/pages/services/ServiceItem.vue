<template>
    <q-card class="shadow-0" square>
        <q-card-section>
            <div class="row items-center">
                <div class="q-mr-md" style="font-size: 10px; width: 2.285em">
                    <template v-if="service.children && service.children.length > 0">
                        <q-btn
                            :icon="expanded? 'remove': 'add'"
                            color="purple"
                            size="sm"
                            class="no-border-radius"
                            dense unelevated flat
                            @click="expanded = !expanded"
                        />
                    </template>

                </div>
                <div style="">
                    <span class="q-mr-sm text-grey" style="width: 21px">{{ service.index }}.</span><span class="text-bold">{{ service.name }}</span>
                </div>
                <q-space/>
                <div class="q-gutter-x-sm">
                    <q-btn
                        label="Добавить"
                        icon="mdi-plus"
                        color="purple"
                        class="no-border-radius"
                        size="sm"
                        unelevated
                        @click="$store.dispatch('dialogs/service/open', {parent: service.id})"
                    />
                    <q-btn
                        label="Редактировать"
                        icon="mdi-pencil"
                        color="green"
                        class="no-border-radius"
                        size="sm"
                        unelevated
                        @click="$store.dispatch('dialogs/service/open', {service})"
                    />
                    <q-btn
                        label="Удалить"
                        icon="mdi-delete"
                        color="red"
                        class="no-border-radius"
                        size="sm"
                        unelevated
                        @click="deleteItem"
                    />
                </div>
            </div>
        </q-card-section>

        <q-slide-transition>
            <div v-show="expanded">
                <q-card-section class="q-pr-none">
                    <div style="padding-left: 38.85px;">
                        <div class="column q-gutter-y-xs">
                            <ServiceItem
                                v-for="children in service.children"
                                :key="children.id"
                                :service="children"
                            />
                        </div>
                    </div>
                </q-card-section>
            </div>
        </q-slide-transition>
    </q-card>
</template>

<script>
export default {
    name: 'ServiceItem',
    props: ['service'],
    data() {
        return {
            expanded: false
        }
    },
    methods: {
        deleteItem() {
            this.$q.dialog({
                title: 'Удаление записи',
                message: `Удалить запись ${this.service.name}`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `services/${this.service.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        return Promise.all([
                            this.$store.dispatch('pages/services/fetchServices'),
                            this.$store.dispatch('dictionary/services/fetchOptions')
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
