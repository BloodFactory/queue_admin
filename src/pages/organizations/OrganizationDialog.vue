<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 400px">
            <q-card-section>
                <q-form ref="form" id="organizationForm" @submit.prevent="save">
                    <q-input label="Название" v-model="name"/>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="organizationForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>

            <q-inner-loading :showing="loading">
                <q-spinner-hourglass size="50px" color="primary"/>
            </q-inner-loading>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: "OrganizationDialog",
    data() {
        return {
            loading: false,
            id: null,
            name: ''
        }
    },
    methods: {
        show(id) {
            this.$refs.dialog.show();

            this.id   = null;
            this.name = '';

            if (null !== id) {
                this.loading = true;

                this.$api({
                    url: '/organizations/' + id,
                    method: 'get'
                }).then(response => {
                    const {id, name} = response.data;

                    this.id   = id;
                    this.name = name;

                    this.$refs.dialog.show();
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        save() {
            this.loading = true;

            const request = {
                name: this.name
            };

            const url = ['/organizations'];

            if (this.id) {
                url.push(this.id)
            }

            this.$api({
                url: url.join('/'),
                method: 'post',
                data: request
            }).then(() => {
                this.$refs.dialog.hide();
                this.$emit('save');
            }).catch(error => {
                this.$q.notify({
                    message: 'Ошибка',
                    type: 'negative',
                    position: 'top'
                })
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>
