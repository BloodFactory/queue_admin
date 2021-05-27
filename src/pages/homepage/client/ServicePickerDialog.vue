<template>
    <q-dialog ref="dialog">
        <q-card style="min-width: 600px;">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Выберите услугу</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-tree
                    node-key="value"
                    :nodes="services"
                    :selected.sync="service"
                    selected-color="primary"
                    default-expand-all
                />
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
    props: ['value'],
    computed: {
        services() {
            return this.$store.getters['dictionary/services/getOptions']
        },
        service: {
            get() {
                return this.value && this.value.value || null
            },
            set(value) {
                const services = this.services

                function getSelectedService(services) {
                    for (let service of services) {
                        if (value === service.value) return service

                        if (service.children) {
                            const innerResult = getSelectedService(service.children)

                            if (innerResult) return innerResult
                        }
                    }

                    return null
                }

                this.$emit('input', getSelectedService(services))
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
