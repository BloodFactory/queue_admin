<template>
    <q-layout view="lHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-toolbar-title v-if="user.hasOwnProperty('organization')">
                    {{ user.organization.name }}
                </q-toolbar-title>

                <router-link v-for="page in pages"
                             :key="page.route"
                             v-if="page.hasOwnProperty('label') && $can('open', page.route)"
                             :to="{name: page.route}"
                             v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <q-btn :label="page.label" @click="navigate" stretch flat/>
                </router-link>

                <q-space/>
                <q-btn label="Выход" flat stretch @click="logout"/>
            </q-toolbar>
        </q-header>

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
    data() {
        return {
            pages: [
                {
                    icon: 'mdi-home',
                    route: 'Homepage'
                },
                {
                    label: 'Пользователи',
                    icon: 'mdi-account',
                    route: 'Users'
                },
                {
                    label: 'Организации',
                    icon: 'mdi-office-building',
                    route: 'Organizations'
                },
                {
                    label: 'Услуги',
                    icon: 'mdi-room-service',
                    route: 'Services'
                }
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters['getUser'];
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
