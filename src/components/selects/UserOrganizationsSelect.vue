<template>
    <q-select
        :value="value"
        :label="label"
        :options="options"
        :dense="dense"
        :outlined="outlined"
        class="no-border-radius"
        :multiple="multiple"
        :use-chips="useChips"
        square
        @input="val => { $emit('input', val) }"
        :rules="[
            v => (multiple && Array.isArray(v) && v.length) || !!v || 'Выберите организацию(и)'
        ]"
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
        },
        multiple: {
            type: Boolean,
            default: false
        },
        useChips: {
            type: Boolean,
            default: false

        }
    },
    computed: {
        options() {
            const organizations = this.$store.getters['organizations/getOrganizations']
            const rights        = this.$store.getters['getRights']

            const result = []

            for (let {name, id, branches} of organizations) {
                if ('all' === this.scope) result.push({label: name, value: id})
                if ('user.view' === this.scope && rights[id] && rights[id].view) result.push({label: name, value: id})
                if ('user.edit' === this.scope && rights[id] && rights[id].edit) result.push({label: name, value: id})

                if (branches) {
                    for (let {name, id} of branches) {
                        if ('all' === this.scope) result.push({label: name, value: id})
                        if ('user.view' === this.scope && rights[id] && rights[id].view) result.push({label: name, value: id})
                        if ('user.edit' === this.scope && rights[id] && rights[id].edit) result.push({label: name, value: id})
                    }
                }
            }

            return result
        }
    }
}
</script>
