<template>
    <q-page padding>
        <SettingsTable ref="settingsTable" @openSettingsDialog="openSettingsDialog"/>
        <SettingsDialog ref="settingsDialog" @save="$refs.settingsTable.fetchList()"/>
    </q-page>
</template>

<script>
import DefaultSettingsDialog from "components/dialogs/DefaultSettingsDialog";
import SettingsTable         from "components/tables/SettingsTable";
import SettingsDialog        from "components/dialogs/SettingsDialog";

export default {
    name: "Settings",
    components: {
        DefaultSettingsDialog,
        SettingsTable,
        SettingsDialog
    },
    methods: {
        openSettingsDialog(id) {
            this.$refs.settingsDialog.show(id)
        }
    },
    mounted() {
        this.$refs.settingsTable.fetchList();
    }
}
</script>
