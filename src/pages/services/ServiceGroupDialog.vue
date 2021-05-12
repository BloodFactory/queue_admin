<template>
    <q-dialog ref="dialog">
        <q-card style="width: 400px">
            <q-card-section>
                <div class="text-h6">Группа услуг</div>
            </q-card-section>
            <q-card-section>
                <q-form id="serviceGroupForm" @submit="save">
                    <q-input
                        v-model="name"
                        label="Название"
                        :rules="[v => !!v || 'Введите название']"
                    />
                </q-form>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="serviceGroupForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    data() {
        return {
            id: null,
            name: ''
        }
    },
    methods: {
        save() {
            this.$q.loading.show()

            let url = '/servicesGroups'

            if (null !== this.id) {
                url += '/' + this.id
            }

            const data = new FormData()
            data.set('name', this.name)

            this.$api({
                url,
                method: 'post',
                data
            })
                .then(() => {
                    this.$refs.dialog.hide()

                    this.$store.dispatch('pages/services/fetchServicesGroups')

                    this.$q.loading.hide()
                })
                .catch(error => {
                    this.$q.loading.hide()

                    this.$q.notify({
                        message: error.response.data,
                        type: 'negative',
                        position: 'top'
                    })
                })
        },
        show(serviceGroup = null) {
            console.log(serviceGroup)
            if (serviceGroup) {
                this.id   = serviceGroup.id
                this.name = serviceGroup.name
            } else {
                this.id   = null
                this.name = ''
            }

            this.$refs.dialog.show()
        }
    }
}
</script>
