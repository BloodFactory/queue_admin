<template>
    <q-select label="Организация"
              v-model="localValue"
              :options="options"
              use-input
              @filter="filter"
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
            options: []
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
        filter(val, update, abort) {
            this.$api({
                url: '/organizations/list',
                method: 'get',
                params: {
                    filter: val
                }
            }).then(response => {
                update(() => {
                    this.options = response.data;
                });
            }).catch(() => {
                abort();
            });

        },
        test(val) {

        }
    }
}
</script>
