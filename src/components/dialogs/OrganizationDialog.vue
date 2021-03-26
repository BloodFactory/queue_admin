<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 400px">
            <q-card-section>
                <q-form>
                    <q-input label="Название" v-model="name"/>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" :loading="loading" @click="save" flat/>
                <q-btn label="Отмена" color="red" :disable="loading" v-close-popup flat/>
            </q-card-actions>
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
            this.id   = null;
            this.name = '';

            if (null !== id) {
                this.$api({
                    url: '/organizations/' + id,
                    method: 'get'
                }).then(response => {
                    const {id, name} = response.data;

                    this.id = id;
                    this.name = name;

                    this.$refs.dialog.show();
                });
            } else {
                this.$refs.dialog.show();
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
