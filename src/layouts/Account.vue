<template>
    <div class="row no-wrap q-pa-md text-no-wrap">
        <div class="column">
            <div class="text-h6 q-mb-md">Настройки</div>
            <q-toggle v-model="darkMode" label="Тёмная тема"/>
        </div>

        <q-separator vertical inset class="q-mx-lg"/>

        <div class="column items-center">
            <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userName }}</div>

            <q-btn color="primary"
                   label="Выход"
                   push
                   size="sm"
                   v-close-popup
                   @click="logout"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "Account",
    computed: {
        userName() {
            const user = this.$store.getters['getUser'];
            console.log(user);
            return [
                user.lastName,
                user.firstName
            ].join(' ');
        },
        darkMode: {
            get() {
                return this.$store.getters['getDarkMode'];
            },
            set(darkMode) {
                this.$store.commit('setDarkMode', darkMode);
            }
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({name: 'Homepage'})
            }).catch(error => {
                this.$q.notify({
                    message: error.request.data,
                    type: 'negative',
                    position: 'top'
                })
            });
        }
    }
}
</script>
