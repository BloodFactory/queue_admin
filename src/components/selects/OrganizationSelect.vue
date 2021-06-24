<template>
    <q-select :label="label"
              v-model="localValue"
              :options="options"
              :option-value="item => !item ? null : item.id"
              :option-label="item => !item ? '' : item.name"
              :map-options="true"
              :rules="[val => !required || val || 'Укажите организацию']"/>
</template>

<script>

export default {
    name: "OrganizationSelect",
    props: {
        label: {
            type: String,
            default: 'Организация'
        },
        value: null,
        required: {
            type: Boolean,
            default: false
        },
        filter: {
            type: Function
        },
        parent: {
            type: Number,
            default: null
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
        },
        options() {
            return []
            // if (this.parent) {
            //     for (let organization of this.$store.getters['organizations/getOrganizations']) {
            //         if (this.parent === organization.id && organization.hasOwnProperty('branches')) return organization.branches;
            //     }
            // }
            //
            // return this.$store.getters['organizations/getOrganizations'];
        }
    }
}
</script>
