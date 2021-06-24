<template>
    <q-dialog
        :value="$store.getters['dialogs/serviceGroup/getDialog']"
        @input="val => {$store.commit('dialogs/serviceGroup/setDialog', val)}"
    >
        <q-card style="min-width: 600px;" square>
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Группа услуг</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="serviceForm" ref="form" @submit.prevent="$store.dispatch('dialogs/serviceGroup/save')">
                    <q-input
                        label="Название"
                        :value="$store.getters['dialogs/serviceGroup/getName']"
                        :rules="[
                            val => !!val || 'Введите название'
                        ]"
                        clearable outlined square dense
                        @input="val => {$store.commit('dialogs/serviceGroup/setName', val)}"
                    />
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn
                    label="Сохранить"
                    color="green"
                    type="submit"
                    form="serviceForm"
                    flat
                />
                <q-btn
                    label="Отмена"
                    color="red"
                    v-close-popup
                    flat
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {}
</script>
