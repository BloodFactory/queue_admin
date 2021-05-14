<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 400px" square>
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Группа услуг</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="serviceGroupForm" @submit="save">
                    <q-input
                        v-model="name"
                        label="Название"
                        :rules="[v => !!v || 'Введите название']"
                        clearable
                        outlined
                    />
                </q-form>
            </q-card-section>

            <q-separator/>

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
        },
        show(serviceGroup = null) {
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
