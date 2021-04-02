<template>
    <q-select label="Организация"
              v-model="localValue"
              :options="options"
              :loading="loading"
              use-input
              :rules="[val => !required || val || 'Укажите организацию']"/>
</template>

<script>
export default {
    name: "OrganizationSelect",
    props: {
        value: {},
        required: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            options: [],
            loading: false
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    created() {
        this.loading = true;

        this.$api({
            url: '/dictionary/organizations',
            method: 'get'
        }).then(response => {
            this.options = response.data;
        }).finally(() => {
            this.loading = false;
        });
    }
}
</script>
