<template>
    <q-layout view="lHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn flat
                       dense
                       round
                       icon="menu"
                       aria-label="Menu"
                       @click="leftDrawerOpen = !leftDrawerOpen"/>

                <q-toolbar-title>
                    <!--                    Quasar App-->
                </q-toolbar-title>

                <q-btn label="Выход" flat @click="logout"/>
            </q-toolbar>
        </q-header>

        <SideNavigation v-model="leftDrawerOpen"/>

        <q-page-container>
            <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <router-view/>
            </transition>
        </q-page-container>
    </q-layout>
</template>

<script>

export default {
    name: 'MainLayout',
    components: {
        SideNavigation: () => import('components/SideNavigation')
    },
    data() {
        return {
            leftDrawerOpen: true,
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({name: 'Login'});
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>
