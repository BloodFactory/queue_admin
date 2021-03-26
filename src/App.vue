<template>
    <AppLoading v-if="isLoading"/>
    <div id="q-app" v-else>
        <router-view v-if="$ability.can('open', $route.name)"/>
        <Error404 v-else/>
    </div>
</template>
<script>
export default {
    name: 'App',
    components: {
        Error404: () => import('pages/Error404'),
        AppLoading: () => import('components/AppLoading')
    },
    data() {
        return {
            isLoading: false
        }
    }
}
</script>
