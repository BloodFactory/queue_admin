<template>
    <q-dialog ref="dialog" full-height>
        <q-card class="column" style="min-width: 600px;" square>
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Выберите услугу</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section class="col">
                <q-scroll-area class="full-height">
                    <q-tree
                        node-key="value"
                        :nodes="services"
                        :selected.sync="selected"
                        selected-color="primary"
                        default-expand-all
                    />
                </q-scroll-area>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Закрыть" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    computed: {
        services() {
            const services = this.$store.getters['services/getServices']

            function parseItem(item) {
                if (!item.hasOwnProperty('children') && !item.hasOwnProperty('services')) {
                    return []
                }

                const result = [];

                if (item.hasOwnProperty('services')) {
                    for (let service of item.services) {
                        result.push({
                            value: service.id,
                            label: service.name,
                            selectable: true
                        })
                    }
                }

                if (item.hasOwnProperty('children')) {
                    for (let child of item.children) {
                        const newItem = {
                            value: 'group_' + child.id,
                            label: child.name,
                            selectable: false
                        }

                        newItem.children = parseItem(child)

                        result.push(newItem)
                    }
                }

                return result
            }

            return parseItem(services)
        },
        selected: {
            get() {
                return this.$store.getters['dialogs/appointment/getService']
            },
            set(selected) {
                this.$store.commit('dialogs/appointment/setService', selected)
            }
        }
    },
    methods: {
        show() {
            this.$refs.dialog.show()
        }
    }
}
</script>
