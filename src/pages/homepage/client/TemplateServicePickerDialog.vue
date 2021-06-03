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
                        :ticked.sync="ticked"
                        tick-strategy="strict"
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
            return this.$store.getters['dictionary/services/getOptions']
        },
        ticked: {
            get() {
                return this.$store.getters['dialogs/appointmentTemplate/getServices']
            },
            set(ticked) {
                this.$store.commit('dialogs/appointmentTemplate/setServices', ticked)
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
