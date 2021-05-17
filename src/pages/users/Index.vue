<template>
    <q-page>
        <ToolBar @addUser="$refs.userDialog.show()"/>

        <UsersList @editUserRights="user => {$refs.userRightsDialog.show(user)}"/>

        <UserDialog ref="userDialog"/>

        <UserRightsDialog ref="userRightsDialog"/>
    </q-page>
</template>

<script>

export default {
    name: "Users",
    components: {
        ToolBar: () => import('./ToolBar'),
        UsersList: () => import('./UsersList'),
        UserDialog: () => import('./UserDialog'),
        UserRightsDialog: () => import('./UserRightsDialog')
    }
}
</script>
