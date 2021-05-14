<template>
    <q-page>
        <ToolBar @addUser="$refs.userDialog.show()"/>

        <UsersList/>

        <UserDialog ref="userDialog"/>
    </q-page>
</template>

<script>

export default {
    name: "Users",
    components: {
        ToolBar: () => import('./ToolBar'),
        UsersList: () => import('./UsersList'),
        UserDialog: () => import('./UserDialog')
    }
}
</script>
