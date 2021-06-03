<template>
    <q-dialog v-model="dialog">
        <q-card style="min-width: 600px">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Загрузка шаблона</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="appointmentFillFromTemplateForm" @submit="save">
                    <div class="q-col-gutter-y-md">
                        <q-select
                            label="Организация"
                            v-model="organization"
                            :options="organizations"
                            option-value="id"
                            option-label="name"
                            outlined square dense
                        />
                        <q-select
                            label="Услуга"
                            v-model="service"
                            :options="services"
                            :disable="!services || services.length === 0"
                            outlined square dense
                        />
                    </div>
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="OK" color="green" type="submit" form="appointmentFillFromTemplateForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    computed: {
        dialog: {
            get() {
                return this.$store.getters['dialogs/appointmentFillFromTemplate/getDialog']
            },
            set(dialog) {
                this.$store.commit('dialogs/appointmentFillFromTemplate/setDialog', dialog)
            }
        },
        organization: {
            get() {
                return this.$store.getters['dialogs/appointmentFillFromTemplate/getOrganization']
            },
            set(organization) {
                this.$store.commit('dialogs/appointmentFillFromTemplate/setOrganization', organization)
            }
        },
        service: {
            get() {
                return this.$store.getters['dialogs/appointmentFillFromTemplate/getService']
            },
            set(service) {
                this.$store.commit('dialogs/appointmentFillFromTemplate/setService', service)
            }
        },
        organizations() {
            return this.$store.getters['pages/appointment/templates/getList'] || []
        },
        services() {
            if (!this.organization || !this.organization.templates) return []

            const result = []

            for (let template of this.organization.templates) {
                result.push({
                    value: template.service.id,
                    label: template.service.name
                })
            }

            return result
        }
    },
    methods: {
        save() {
            this.$store.dispatch('dialogs/appointmentFillFromTemplate/save').then(() => {
                this.dialog = false
            })
        }
    },
    mounted() {
        if (null === this.$store.getters['pages/appointment/templates/getList']) {
            this.$store.dispatch('pages/appointment/templates/fetchList')
        }
    },
    watch: {
        'dialog'(val) {
            if (!val) {
                this.service      = null
                this.organization = null
            }
        }
    }
}
</script>
