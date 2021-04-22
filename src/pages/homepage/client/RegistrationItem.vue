<template>
    <q-tr :props="props" style="position: relative">
        <q-td>{{ props['row']['time'] }}</q-td>
        <q-td>{{ props['row']['person']['lastName'] }}</q-td>
        <q-td>{{ props['row']['person']['firstName'] }}</q-td>
        <q-td>{{ props['row']['person']['middleName'] }}</q-td>
        <q-td class="text-right">{{ props['row']['person']['birthday'] }}</q-td>
        <q-td>{{ props['row']['person']['phone'] }}</q-td>
        <q-td>{{ props['row']['person']['email'] }}</q-td>
        <q-td style="text-align: right">
            <q-btn icon="mdi-delete"
                   size="sm"
                   padding="xs"
                   class="text-black"
                   :loading="loading"
                   unelevated
                   rounded
                   @click="remove"/>
        </q-td>
    </q-tr>
</template>

<script>
export default {
    name: "RegistrationItem",
    props: ['props'],
    data() {
        return {
            loading: false
        }
    },
    methods: {
        remove() {
            if (this.loading) return;

            this.$q.dialog({
                title: 'Подтвердите действие',
                message: 'Удалить выбраную запись?',
                cancel: 'Отмена',
                persistent: true
            }).onOk(() => {
                this.loading = true;

                this.$api({
                    url: '/requests/' + this.props['row']['id'],
                    method: 'delete'
                }).then(() => {
                    this.$emit('delete');
                }).catch((error) => {
                    this.$q.notify({
                        message: error.response.data,
                        type: 'negative',
                        position: 'top'
                    })
                }).finally(() => {
                    this.loading = false;
                });
            })
        }
    }
}
</script>
