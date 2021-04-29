<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 400px">
            <q-card-section>
                <q-form ref="form" id="organizationForm" @submit.prevent="save">
                    <q-input label="Название" v-model="name" :rules="rules.name"/>

                    <q-input label="Часовой пояс (UTC)" v-model="timezone" type="number" :rules="rules.timeZone"/>
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
            name: '',
            timezone: 3,
            rules: {
                name: [
                    v => !!v || 'Заполните поле'
                ],
                timeZone: [
                    v => {
                        if (isNaN(v)) return 'Введите число';
                        v = parseInt(v);
                        if (v < -12 || v > 12) return 'Значение должно быть в диапазоне от -12 до +12 ';
                        return true;
                    }
                ]
            }
        }
    },
    methods: {
        show(id) {
            this.$refs.dialog.show();

            this.id       = null;
            this.name     = '';
            this.timezone = 3;

            if (null !== id) {
                this.loading = true;

                this.$api({
                    url: '/organizations/' + id,
                    method: 'get'
                }).then(response => {
                    const {id, name, timezone} = response.data;

                    this.id       = id;
                    this.name     = name;
                    this.timezone = timezone;

                    this.$refs.dialog.show();
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        save() {
            if (this.loading || !this.$refs.form.validate()) return;

            this.loading = true;

            const request = {
                name: this.name,
                timezone: parseInt(this.timezone)
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
