<template>
    <div class="organization">
        <div class="organization-wrap flex q-px-md q-py-sm">
            <div class="organization-expand q-mr-md">
                <q-btn v-if="item.branches"
                       :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
                       color="purple"
                       size="xs"
                       round
                       unelevated
                       @click="expanded = !expanded"/>
            </div>

            <div class="organization-index q-mr-md">
                {{ item.index }}
            </div>

            <div class="organization-name">
                {{ item.name }}
            </div>

            <div class="organization-control q-gutter-xs">
                <q-btn v-if="$can('update', 'Organizations')"
                       color="primary"
                       icon="mdi-pencil"
                       size="sm"
                       flat
                       round
                       @click="$emit('openOrganization', item.id)"/>
                <q-btn v-if="$can('delete', 'Organizations')"
                       color="red"
                       icon="mdi-delete"
                       size="sm"
                       flat
                       round
                       @click="$emit('deleteOrganization', item.id)"/>
            </div>
        </div>

        <div v-if="expanded" class="organization-branches">
            <div v-for="branch in item.branches" class="organization-branch flex q-px-md q-py-sm">
                <div class="organization-index q-mr-md">
                    {{ item.index }}.{{ branch.index }}
                </div>

                <div class="organization-name">
                    {{ branch.name }}
                </div>

                <div class="organization-control q-gutter-xs">
                    <q-btn v-if="$can('update', 'Organizations')"
                           color="primary"
                           icon="mdi-pencil"
                           size="sm"
                           flat
                           round
                           @click="$emit('openOrganization', branch.id)"/>
                    <q-btn v-if="$can('delete', 'Organizations')"
                           color="red"
                           icon="mdi-delete"
                           size="sm"
                           flat
                           round
                           @click="$emit('deleteOrganization', branch.id)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrganizationItem",
    props: ['item'],
    data() {
        return {
            expanded: false
        }
    }
}
</script>

<style lang="scss">
.organization {
    &:not(:last-child){
        border-bottom: 1px solid #aaa;
    }

    .organization-branch {
        padding-left: 100px;
    }

    .organization-wrap:hover {
        cursor: pointer;
    }

    .organization-wrap,
    .organization-branch {
        .organization-expand {
            width: 25px;
        }

        .organization-name {
            flex-grow: 1
        }
    }
}
</style>
