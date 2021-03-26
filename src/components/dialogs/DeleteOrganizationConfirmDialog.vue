<template>
    <q-dialog>
        <q-card>
            <q-card-section></q-card-section>

            <q-card-actions></q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: "DeleteOrganizationConfirmDialog",
    methods: {
        this.$refs.dialog.show();
    }
}
</script>
