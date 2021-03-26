<template>
    <q-page padding>
        <!--        <q-card>-->
        <!--            <q-card-section>-->
        <!--                <div class="text-h6">Стандартные настройки</div>-->
        <!--            </q-card-section>-->

        <!--            <q-separator/>-->

        <!--            <q-card-section>-->
        <!--                Данный раздел не является обязательным, но может облегчить создание новых записей-->
        <!--            </q-card-section>-->

        <!--            <q-separator/>-->

        <!--            <q-card-actions>-->
        <!--                <q-btn icon="mdi-cog" label="Настроить" flat @click="$refs.defaultSettingsDialog.show()"/>-->
        <!--            </q-card-actions>-->
        <!--        </q-card>-->

        <!--        <DefaultSettingsDialog ref="defaultSettingsDialog"/>-->

        <SettingsTable ref="settingsTable" @openSettingsDialog="openSettingsDialog"/>
        <SettingsDialog ref="settingsDialog"/>
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
    }
}
</script>
