<template>
    <q-page>
        <q-toolbar>
<!--            TODO: Сделать две страницы - страницу с открытыми записями и страницу с записавшимися кандидатами. На страницах сделать фильтрыё-->
        </q-toolbar>
    </q-page>
</template>

<script>
export default {
    components: {
        UserOrganizationsList: () => import('./UserOrganizationsList')
    },
    data() {
        return {
            organization: null
        }
    }
}
</script>
