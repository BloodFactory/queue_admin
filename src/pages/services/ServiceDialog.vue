<template>
    <q-dialog v-model="dialog" persistent>
        <q-card style="width: 400px">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Услуга</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="serviceForm" ref="form" @submit.prevent="$store.dispatch('dialogs/service/save')">
                    <q-input
                        label="Название"
                        v-model="name"
                        clearable
                        outlined
                    />
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="serviceForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    computed: {
        dialog: {
            get() {
                return this.$store.getters['dialogs/service/getDialog']
            },
            set(dialog) {
                this.$store.commit('dialogs/service/setDialog', dialog)
            }
        },
        name: {
            get() {
                return this.$store.getters['dialogs/service/getName']
            },
            set(name) {
                this.$store.commit('dialogs/service/setName', name)
            }
        },
        id: {
            get() {
                return this.$store.getters['dialogs/service/getId']
            },
            set(id) {
                this.$store.commit('dialogs/service/setId', id)
            }
        },
        parent: {
            get() {
                return this.$store.getters['dialogs/service/getParent']
            },
            set(parent) {
                this.$store.commit('dialogs/service/setParent', parent)
            }
        }
    }
}
</script>
