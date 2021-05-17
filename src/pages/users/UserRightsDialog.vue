<template>
    <q-dialog ref="dialog" persistent>
        <q-card style="max-width: 800px; width: 800px" square>
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Настройка прав пользовталя {{ user && user.username || '' }}</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <UserRightsHierarchyTable :rights="rights"/>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" flat @click="save"/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    components: {
        UserRightsHierarchyTable: () => import('./UserRightsHierarchyTable')
    },
    data() {
        return {
            user: null,
            rights: []
        }
    },
    methods: {
        show(user) {
            let getRights = (organizations) => {
                const result = []

                for (let organization of organizations) {
                    let item = {
                        value: organization.value,
                        name: organization.label,
                        view: user.rights[organization.value] ? user.rights[organization.value]['view'] : false,
                        edit: user.rights[organization.value] ? user.rights[organization.value]['edit'] : false,
                        delete: user.rights[organization.value] ? user.rights[organization.value]['delete'] : false,
                    }

                    if (organization.hasOwnProperty('branches') && organization.branches.length > 0) {
                        item.children = getRights(organization.branches)
                    }

                    result.push(item)
                }

                return result
            }

            this.user = user

            const organizations = this.$store.getters['dictionary/organizations/getOptions']

            this.rights = getRights(organizations)

            this.$refs.dialog.show()
        },

        save() {
            this.$q.loading.show()
            const data = new FormData

            data.append('userID', this.user.id)

            this.rights.forEach(item => {
                if (item.view) data.append(`rights[${item.value}][view]`, item.view)
                if (item.edit) data.append(`rights[${item.value}][edit]`, item.edit)
                if (item.delete) data.append(`rights[${item.value}][delete]`, item.delete)

                if (item.children) {
                    item.children.forEach(item => {
                        if (item.view) data.append(`rights[${item.value}][view]`, item.view)
                        if (item.edit) data.append(`rights[${item.value}][edit]`, item.edit)
                        if (item.delete) data.append(`rights[${item.value}][delete]`, item.delete)
                    })
                }
            })

            this.$api({
                url: `users/${this.user.id}/rights`,
                method: 'post',
                data
            }).then(() => {
                return this.$store.dispatch('pages/users/fetchUsers')
            }).then(()=> {
                this.$refs.dialog.hide()
            })
                .finally(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>
