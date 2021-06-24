<template>
    <q-dialog v-model="dialog">
        <q-card style="min-width: 600px" square>
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
                        clearable outlined square dense
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
        parent: {
            get() {
                return this.$store.getters['dialogs/service/getGroupId']
            },
            set(parent) {
                this.$store.commit('dialogs/service/setParent', parent)
            }
        }
    }
}
</script>
