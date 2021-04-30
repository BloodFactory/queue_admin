<template>
    <q-layout view="lHh Lpr lFf">
        <q-header :class="$q.dark.isActive && 'bg-black'">
            <q-toolbar>
                <q-toolbar-title v-if="user.hasOwnProperty('organization')">
                    {{ user.organization.name }}
                </q-toolbar-title>

                <router-link v-for="page in pages"
                             :key="page.route"
                             v-if="page.hasOwnProperty('label') && $can('open', page.route)"
                             :to="{name: page.route}"
                             v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <q-btn :label="page.label" @click="navigate" stretch flat class="q-border"/>
                </router-link>

                <q-space/>
                <q-btn label="Учётная запись" flat stretch>
                    <q-menu>
                        <Account/>
                    </q-menu>
                </q-btn>
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
import Account from "./Account";

export default {
    name: 'MainLayout',
    components: {
        Account
    },
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
    }
}
</script>
