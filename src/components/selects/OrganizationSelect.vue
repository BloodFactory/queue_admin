<template>
    <q-select :label="label"
              v-model="localValue"
              :options="options"
              :loading="loading"
              @filter="loadOptions"
              use-input
              :rules="[val => !required || val || 'Укажите организацию']"/>
</template>

<script>
export default {
    name: "OrganizationSelect",
    props: {
        label: {
            type: String,
            default: 'Оргнанизация'
        },
        value: {},
        required: {
            type: Boolean,
            default: false
        },
        filter: {
            type: Function
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
                url: '/dictionary/organizations',
                method: 'get'
            }).then(response => {
                update(() => {
                    let data = response.data;

                    if (null !== this.filter && typeof this.filter === 'function') {
                        data = data.filter(this.filter);
                    }

                    this.options = data;
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
