<template>
    <q-card class="shadow-1" square>
        <q-card-section>
            <div class="row items-center">
                <div class="q-mr-md" style="font-size: 10px; width: 2.285em">
                    <template v-if="(item.children && item.children.length > 0) || (item.services && item.services.length > 0)">
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
                    <span class="q-mr-sm text-grey" style="width: 21px">{{ index }}.</span><span class="text-bold">{{ item.name }}</span>
                </div>
                <q-space/>
                <q-btn
                    icon="more_vert"
                    flat dense round
                >
                    <q-menu>
                        <q-list>
                            <q-item clickable v-close-popup @click="$store.dispatch('dialogs/serviceGroup/open', {parent: item.id})">
                                <q-item-section avatar>
                                    <q-icon name="add"/>
                                </q-item-section>
                                <q-item-section>Добавить дочернюю группу</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="$store.dispatch('dialogs/service/open', {groupId: item.id})">
                                <q-item-section avatar>
                                    <q-icon name="add"/>
                                </q-item-section>
                                <q-item-section>Добавить услугу</q-item-section>
                            </q-item>
                            <q-separator/>
                            <q-item clickable v-close-popup @click="$store.dispatch('dialogs/serviceGroup/open', {serviceGroup: item})">
                                <q-item-section avatar>
                                    <q-icon name="edit"/>
                                </q-item-section>
                                <q-item-section>Редактировать</q-item-section>
                            </q-item>
                            <q-separator/>
                            <q-item clickable v-close-popup @click="deleteItem" :disable="item.services.length || item.children.length">
                                <q-item-section avatar>
                                    <q-icon name="delete"/>
                                </q-item-section>
                                <q-item-section>Удалить</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </div>
        </q-card-section>

        <q-slide-transition>
            <div v-show="expanded">
                <q-card-section v-if="item.children && item.children.length > 0" class="q-pr-none">
                    <div style="padding: 0 39px;">
                        <div class="text-subtitle1 q-mb-md">Подгруппы</div>
                        <div class="column q-gutter-y-md">
                            <GroupItem
                                v-for="(child, childIndex) in item.children"
                                :key="child.id"
                                :item="child"
                                :index="childIndex + 1"
                            />
                        </div>
                    </div>
                </q-card-section>
            </div>
        </q-slide-transition>

        <q-slide-transition>
            <div v-show="expanded">
                <q-card-section v-if="item.services && item.services.length > 0" class="q-pr-none">
                    <div style="padding-left: 38.85px;">
                        <div class="text-subtitle1">Услуги</div>
                        <div class="column q-gutter-y-xs">
                            <ServiceItem
                                v-for="(service, serviceIndex) in item.services"
                                :key="service.id"
                                :item="service"
                                :index="serviceIndex + 1"
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
    name: 'GroupItem',
    props: [
        'item',
        'index'
    ],
    components: {
        ServiceItem: () => import('./ServiceItem')
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
                message: `Удалить запись ${this.item.name}`,
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.$q.loading.show()

                this.$api({
                    url: `servicesGroups/${this.item.id}`,
                    method: 'delete'
                })
                    .then(() => {
                        return Promise.all([
                            this.$store.dispatch('services/fetch'),
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
