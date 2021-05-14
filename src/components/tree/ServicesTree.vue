<template>
    <q-tree
        :nodes="tree"
        node-key="value"
        tick-strategy="leaf"
        :ticked.sync="ticked"
        :expanded.sync="expanded"
    />
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            expanded: []
        }
    },
    computed: {
        ticked: {
            get() {
                return this.value
            },
            set(ticked) {
                this.$emit('input', ticked)
            }
        },
        tree() {
            return this.transformStore(this.$store.getters['dictionary/services/getOptions'])
        }
    },
    methods: {
        transformStore(items) {
            const result = [];

            let newItem = {}
            for (let item of items) {
                newItem = {
                    label: item.label,
                    value: item.value
                }

                if (item.hasOwnProperty('services') && item.services.length > 0) newItem.children = this.transformStore(item.services)

                result.push(newItem)
            }

            return result
        }
    }
}
</script>
