<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 400px">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Услуга</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="serviceForm" ref="form" @submit.prevent="save">
                    <q-input
                        label="Название"
                        v-model="name"
                        clearable
                        outlined
                    />
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="serviceForm" flat/>
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
            servicesGroupID: null,
            name: ''
        }
    },
    methods: {
        show(servicesGroupID, service = null) {
            this.servicesGroupID = servicesGroupID

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

            const data = new FormData()

            data.set('servicesGroupID', this.servicesGroupID)
            data.set('name', this.name)

            const url = ['/services']

            if (this.id) {
                url.push(this.id)
            }

            this.$api({
                url: url.join('/'),
                method: 'post',
                data
            }).then(() => {
                return Promise.all([
                    this.$store.dispatch('pages/services/fetchServices'),
                    this.$store.dispatch('dictionary/services/fetchOptions')
                ])
            }).then(() => {
                this.$refs.dialog.hide()
            }).finally(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>
