<template>
    <q-page padding>
        <UsersTable ref="usersTable"
                    @openUserDialog="openUserDialog"/>
        <UserDialog ref="userDialog" @save="$refs.usersTable.loadUsers()"/>
    </q-page>
</template>

<script>
import UsersTable from "components/tables/UsersTable";
import UserDialog from "components/dialogs/UserDialog";

export default {
    name: "Users",
    components: {
        UsersTable,
        UserDialog
    },
    data() {
        return {}
    },
    methods: {
        openUserDialog(id) {
            this.$refs.userDialog.show(id)
        }
    },
    mounted() {
        this.$refs.usersTable.loadUsers()
    }
}
</script>
