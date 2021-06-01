<template>
    <q-select
        :value="value"
        :label="label"
        :options="options"
        :dense="dense"
        :outlined="outlined"
        class="no-border-radius"
        multiple use-chips square
        @input="val => { $emit('input', val) }"
    />
</template>

<script>
export default {
    props: {
        value: [
            String,
            Array,
            Object
        ],
        label: {
            type: String,
            default: 'Организация'
        },
        dense: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        scope: {
            type: String,
            default: 'all',
            validator: val => [
                'all',
                'user.view',
                'user.edit',
            ].includes(val)
        }
    },
    computed: {
        options() {
            const organizations = this.$store.getters['dictionary/organizations/getOptions']
            const rights        = this.$store.getters['getRights']

            const result = []

            for (let {label, value, branches} of organizations) {
                if ('all' === this.scope) result.push({label, value})
                if ('user.view' === this.scope && rights[value] && rights[value].view) result.push({label, value})
                if ('user.edit' === this.scope && rights[value] && rights[value].edit) result.push({label, value})

                if (branches) {
                    for (let {label, value} of branches) {
                        if ('all' === this.scope) result.push({label, value})
                        if ('user.view' === this.scope && rights[value] && rights[value].view) result.push({label, value})
                        if ('user.edit' === this.scope && rights[value] && rights[value].edit) result.push({label, value})
                    }
                }
            }

            return result
        }
    }
}
</script>
