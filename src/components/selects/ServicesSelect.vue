<template>
    <q-select label="Название услуги"
              v-model="localValue"
              :options="options"
              :loading="loading"
              @filter="loadOptions"
              use-input
              :rules="[val => !required || val || 'Укажите услугу']"/>
</template>

<script>
export default {
    name: "ServicesSelect",
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
    methods: {
        loadOptions(val, update, abort) {
            this.loading = true;

            this.$api({
                url: '/dictionary/services',
                method: 'get'
            }).then(response => {
                update(() => {
                    this.options = response.data;
                });
            }).catch(error => {
                this.$q.notify({
                    message: error.response.data,
                    type: 'negative',
                    position: 'top'
                });
                abort();
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>
