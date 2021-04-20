<template>
    <q-tr :props="props" :class="rowClass" style="position: relative">
        <q-td>{{ props['row']['time'] }}</q-td>
        <q-td>{{ props['row']['person']['lastName'] }}</q-td>
        <q-td>{{ props['row']['person']['firstName'] }}</q-td>
        <q-td>{{ props['row']['person']['middleName'] }}</q-td>
        <q-td class="text-right">{{ props['row']['person']['birthday'] }}</q-td>
        <q-td>{{ props['row']['person']['phone'] }}</q-td>
        <q-td>{{ props['row']['person']['email'] }}</q-td>
        <q-td style="text-align: right">
            <q-btn icon="mdi-check"
                   size="sm"
                   padding="xs"
                   :class="true !== props['row']['status'] ? 'text-black': 'text-white'"
                   :color="(props['row']['status'] === true) ? 'green' : 'standard'"
                   :loading="loading"
                   unelevated
                   rounded
                   @click="setStatus(true)"/>
            <q-btn icon="mdi-cancel"
                   size="sm"
                   padding="xs"
                   :class="false !== props['row']['status'] ? 'text-black': 'text-white'"
                   :color="(props['row']['status'] === false) ? 'red' : 'standard'"
                   :loading="loading"
                   unelevated
                   rounded
                   @click="setStatus(false)"/>
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
    computed: {
        rowClass() {
            if (false === this.props['row']['status']) return 'bg-red-2';
            if (true === this.props['row']['status']) return 'bg-green-2';
        }
    },
    methods: {
        setStatus(status) {
            if (this.loading || status === this.props['row']['status']) return;

            this.loading = true;

            this.$api({
                url: '/requests/' + this.props['row']['id'] + '/status',
                method: 'post',
                data: {
                    status
                }
            }).then(() => {
                this.props['row']['status'] = status;
            }).catch((error) => {
                this.$q.notify({
                    message: error.response.data,
                    type: 'negative',
                    position: 'top'
                })
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>
