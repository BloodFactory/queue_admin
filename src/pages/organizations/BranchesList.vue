<template>
    <q-card-section class="q-pt-lg">
        <q-list>
            <q-item-label header>Филиалы</q-item-label>
            <template v-for="(branch, index) in branches">
                <BranchItem
                    :branch="branch"
                    @edit="branch => {$emit('edit', branch)}"
                />

                <q-separator v-if="index < branches.length - 1"/>
            </template>
        </q-list>
    </q-card-section>
</template>

<script>
import BranchItem from './BranchItem'

export default {
    props: ['branches'],
    components: {
        BranchItem
    }
}
</script>
