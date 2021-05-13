<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="width: 450px">
            <q-card-section>
                <q-form ref="form" id="organizationForm" @submit.prevent="save">
                    <q-input label="Название" v-model="name" :rules="rules.name"/>

                    <q-input label="Разница в часах относительно МСК (UTC)" v-model="timezone" type="number" :rules="rules.timeZone"/>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="organizationForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import OrganizationSelect from "components/selects/OrganizationSelect";

export default {
    components: {OrganizationSelect},
    data() {
        return {
            id: null,
            organizationID: null,
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
        show(organizationID, branch = null) {
            this.organizationID = organizationID

            if (null === branch) {
                this.id       = null
                this.name     = ''
                this.timezone = 3
            } else {
                this.id       = branch.id
                this.name     = branch.name
                this.timezone = branch.timezone
            }

            this.$refs.dialog.show()
        },
        save(){
            this.$q.loading.show()

            let url = '/organizations'

            if (null !== this.id) {
                url += '/' + this.id
            }

            const data = new FormData()
            data.set('name', this.name)
            data.set('timezone', this.timezone)
            data.set('parent', this.organizationID)

            this.$api({
                url,
                method: 'post',
                data
            }).then(() => {
                return Promise.all([
                    this.$store.dispatch('pages/organizations/fetchOrganizations'),
                    this.$store.dispatch('dictionary/organizations/fetchOptions')
                ])
            }).then(() => {
                this.$refs.dialog.hide()
            }).finally(() => {
                this.$q.loading.hide()
            })
        },
        filterParents(item) {
            return item.value !== this.id
        }
    }
}
</script>
