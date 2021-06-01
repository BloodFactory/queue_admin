<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <AppLoading v-if="isLoading"/>
        <Login v-else-if="!isAuthorized"/>
        <div id="q-app" v-else>
            <router-view v-if="$ability.can('open', $route.name)"/>
            <Error404 v-else/>
        </div>
    </transition>
</template>
<script>
import {Notify} from "quasar";

export default {
    name: 'App',
    components: {
        Error404: () => import('pages/Error404'),
        AppLoading: () => import('components/AppLoading'),
        Login: () => import('components/Login')
    },
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        isAuthorized() {
            return this.$store.getters['getIsAuthorized'];
        }
    },
    mounted() {
        this.$q.dark.set(false)
        const start    = new Date().getTime();
        this.isLoading = true;
        this.$store.dispatch('initApp')
            .catch(error => {
                if (401 !== error.response.status)
                    Notify.create({
                        message: error,
                        position: 'top',
                        type: 'negative'
                    })
            })
            .finally(() => {
                const finish = new Date().getTime();
                const diff   = finish - start;

                if (diff < 1000) {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000)
                } else {
                    this.isLoading = false;
                }
            });
    }
}
</script>
