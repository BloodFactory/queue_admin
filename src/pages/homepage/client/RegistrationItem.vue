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
            <q-toggle :value="props['row']['status']"
                      color="green"
                      icon-color="black"
                      @input="toggleStatus"/>
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
        toggleStatus() {
            this.loading                = true;
            this.props['row']['status'] = !this.props['row']['status'];
        }
    }
}
</script>
