<template>
    <q-dialog v-model="dialog" persistent>
        <q-card style="width: 450px">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Организция</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form ref="form" id="organizationForm" @submit.prevent="$store.dispatch('dialogs/organization/save')">
                    <q-input
                        label="Название"
                        v-model="name"
                        :rules="rules.name"
                        clearable
                        outlined
                    />

                    <q-input
                        label="Разница в часах относительно МСК (UTC)"
                        v-model="timezone"
                        type="number"
                        :rules="rules.timeZone"
                        clearable
                        outlined
                    />
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="organizationForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import OrganizationSelect from "components/selects/OrganizationSelect";

export default {
    name: "OrganizationDialog",
    components: {
        OrganizationSelect
    },
    data() {
        return {
            rules: {
                name: [
                    v => !!v || 'Заполните поле'
                ],
                timeZone: [
                    v => {
                        if (isNaN(v)) return 'Введите число';
                        v = parseInt(v);
                        if (v < -12 || v > 12) return 'Значение должно быть в диапазоне от -12 до +12 ';
                        return true;
                    }
                ]
            }
        }
    },
    computed: {
        dialog: {
            get() {
                return this.$store.getters['dialogs/organization/getDialog']
            },
            set(dialog) {
                this.$store.commit('dialogs/organization/setDialog', dialog)
            }
        },
        name: {
            get() {
                return this.$store.getters['dialogs/organization/getName']
            },
            set(name) {
                this.$store.commit('dialogs/organization/setName', name)
            }
        },
        timezone: {
            get() {
                return this.$store.getters['dialogs/organization/getTimezone']
            },
            set(timezone) {
                this.$store.commit('dialogs/organization/setTimezone', timezone)
            }
        }
    }
}
</script>
