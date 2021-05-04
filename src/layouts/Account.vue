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
            return [
                user.lastName,
                user.firstName
            ].join(' ');
        },
        darkMode: {
            get() {
                return this.$q.dark.isActive;
            },
            set(darkMode) {
                this.$q.loading.show();

                this.$api({
                    url: '/settings/darkMode',
                    method: 'post',
                    data: {
                        darkMode
                    }
                }).then(response => {
                    this.$store.commit('setDarkMode', darkMode);
                }).catch(error => {
                    this.$q.notify({
                        message: error.response.data,
                        type: 'negative',
                        position: 'top'
                    })
                }).finally(() => {
                    this.$q.loading.hide();
                });
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
