<template>
    <q-dialog ref="dialog">
        <q-card style="width: 600px">
            <q-card-section>
                <div class="text-h6">Организация</div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" unelevated/>
                <q-btn label="Отмена" color="negative" unelevated v-close-popup/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    methods: {
        show() {
            this.$refs.dialog.show();
        }
    }
}
</script>
