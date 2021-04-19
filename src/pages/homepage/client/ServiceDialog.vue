<template>
    <q-dialog ref="dialog" persistent @hide="onReset">
        <q-card style="width: 450px;">
            <q-card-section>
                <q-form id="organizationServiceForm" ref="form" @submit.prevent="save">
                    <ServicesSelect v-model="service" required/>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="organizationServiceForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import ServicesSelect from "components/selects/ServicesSelect";

export default {
    name: "ServiceDialog",
    components: {ServicesSelect},
    data() {
        return {
            service: null
        }
    },
    methods: {
        show(id) {
            this.$refs.dialog.show();
        },
        save() {
            if (this.$refs.form.validate()) {
                this.$api({
                    url: '/organization_services',
                    method: 'post',
                    data: {
                        service: this.service.value
                    }
                }).then(() => {
                    this.$refs.dialog.hide();
                    this.$emit('save');
                });
            }
        },
        onReset() {
            this.service = null;
        }
    }
}
</script>
