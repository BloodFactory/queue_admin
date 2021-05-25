<template>
    <q-card square :flat="child">
        <q-card-section :class="(child ? 'q-px-none ' : '') + 'q-py-sm'">
            <div class="row">
                <div class="q-px-sm text-bold text-caption toggle">
                    <q-btn
                        v-if="item.children"
                        :icon="expanded ? 'remove' : 'add'"
                        size="sm"
                        dense unelevated
                        @click="expanded = !expanded"
                    />
                </div>
                <div class="q-px-sm text-bold text-caption username">
                    {{ item.name }}
                </div>
                <div class="q-px-sm text-bold text-caption rights">
                    <q-checkbox v-model="item.view" dense @input="onInputView"/>
                </div>
                <div class="q-px-sm text-bold text-caption rights">
                    <q-checkbox v-model="item.edit" dense :disable="!item.view" @input="onInputEdit"/>
                </div>
                <div class="q-px-sm text-bold text-caption rights">
                    <q-checkbox v-model="item.delete" dense :disable="!item.edit"/>
                </div>
            </div>
        </q-card-section>

        <template v-if="item.children">
            <q-slide-transition>
                <div v-show="expanded">
                    <q-card-section>
                        <div class="column q-gutter-y-md">
                            <UserRightsItem v-for="child in item.children" :key="child.value" :item="child" child/>
                        </div>
                    </q-card-section>
                </div>
            </q-slide-transition>
        </template>
    </q-card>
</template>

<script>
export default {
    name: 'UserRightsItem',
    props: {
        item: {},
        child: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            expanded: false,
        }
    },
    methods: {
        onInputView(val) {
            if (!val) {
                this.item.edit = false
                this.item.delete = false
            }
        },
        onInputEdit(val) {
            if (!val) {
                this.item.delete = false
            }
        }
    }
}
</script>


<style scoped lang="scss">
.toggle, .rights {
    width: 50px
}
</style>

