<template>
    <q-layout view="lHh Lpr lFf">
        <q-header :class="$q.dark.isActive && 'bg-black'">
            <q-toolbar>
                <q-toolbar-title v-if="user.hasOwnProperty('organization')">
                    {{ user.organization.name }}
                </q-toolbar-title>

                <q-btn-group unelevated stretch>
                    <router-link v-for="page in pages"
                                 :key="page.route"
                                 v-if="page.hasOwnProperty('label') && $can('open', page.route)"
                                 :to="{name: page.route}"
                                 v-slot="{ href, route, navigate, isActive, isExactActive }">
                        <q-btn flat :color="isActive ? 'yellow' : 'white'" :label="page.label" @click="navigate"/>
                    </router-link>
                </q-btn-group>

                <q-space/>

                <q-btn label="Учётная запись" flat stretch>
                    <q-menu>
                        <Account/>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container :class="darkMode && 'bg-grey-9' || 'bg-grey-4'">
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
                    label: 'Пользователи',
                    route: 'Users'
                },
                {
                    label: 'Организации',
                    route: 'Organizations'
                },
                {
                    label: 'Услуги',
                    route: 'Services'
                }
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters['getUser'];
        },
        darkMode() {
            return this.$q.dark.isActive;
        },
        page() {
            return this.$route.name
        }
    },
    methods: {
        navigate(page) {
            if (page === this.$route.name) return

            this.$router.push({name: page})
        }
    }
}
</script>
