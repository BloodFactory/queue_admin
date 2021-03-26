<template>
    <q-table title="Настройки электронных очередей">
        <template v-slot:top-right>
            <q-btn label="Добавить" icon="mdi-plus" color="primary" @click="addSettings"/>
        </template>
    </q-table>
</template>

<script>
export default {
    name: "SettingsTable",
    methods: {
        addSettings() {
            this.$emit('openSettingsDialog', null)
        },
    }
}
</script>
