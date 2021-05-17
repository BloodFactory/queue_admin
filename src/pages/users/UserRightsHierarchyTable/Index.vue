<template>
    <div>
        <div class="column q-gutter-y-md">
            <q-card class="bg-cyan-10 text-white shadow-0" style="height: 36px;" square>
                <q-card-section class="q-py-sm">
                    <div class="row">
                        <div class="q-px-sm text-bold text-caption toggle"/>
                        <div class="q-px-sm text-bold text-caption username">Название организации</div>
                        <div class="q-px-sm rights">
                            <q-icon name="visibility"/>
                        </div>
                        <div class="q-px-sm rights">
                            <q-icon name="edit"/>
                        </div>
                        <div class="q-px-sm rights">
                            <q-icon name="delete"/>
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <Item v-for="item in rights" :key="item.value" :item="item"/>
        </div>
    </div>
</template>

<script>
export default {
    props: ['rights'],
    components: {
        Item: () => import('./Item')
    }
}
</script>

<style scoped lang="scss">
.toggle, .rights {
    width: 50px
}
</style>
