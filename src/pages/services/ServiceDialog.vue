<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 400px">
            <q-card-section>
                <q-form id="serviceForm" ref="form" @submit.prevent="save">
                    <q-input label="Название" v-model="name"/>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="serviceForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: "ServiceDialog",
    data() {
        return {
            id: null,
            name: ''
        }
    },
    methods: {
        show(service = null) {
            if (null === service) {
                this.id   = null
                this.name = ''
            } else {
                this.id   = service.id
                this.name = service.name
            }

            this.$refs.dialog.show()
        },
        save() {
            this.$q.loading.show()

            const request = {
                name: this.name
            }

            const url = ['/services']

            if (this.id) {
                url.push(this.id)
            }

            this.$api({
                url: url.join('/'),
                method: 'post',
                data: request
            }).then(() => {
                this.$refs.dialog.hide()
                this.$emit('save')
            }).catch(error => {
                this.$q.notify({
                    message: 'Ошибка',
                    type: 'negative',
                    position: 'top'
                })
            }).finally(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>
