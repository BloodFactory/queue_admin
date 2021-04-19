<template>
    <q-layout>
        <q-page-container>
            <q-page class="window-height window-width row justify-center items-center"
                    style="background: linear-gradient(#8274C5, #5A4A9F);">
                <div class="column q-pa-lg">
                    <div class="row">
                        <q-card square class="shadow-24" style="width:300px; height:385px;">
                            <q-card-section class="bg-deep-purple-7">
                                <h4 class="text-h5 text-white q-my-md">Вход</h4>
                            </q-card-section>
                            <q-card-section>
                                <q-form id="loginForm" class="q-px-sm q-pt-lg" @submit.prevent="login">
                                    <q-input square v-model="username" label="Имя пользователя">
                                        <template v-slot:prepend>
                                            <q-icon name="mdi-account"/>
                                        </template>
                                    </q-input>
                                    <q-input square v-model="password" type="password" label="Пароль">
                                        <template v-slot:prepend>
                                            <q-icon name="mdi-lock"/>
                                        </template>
                                    </q-input>
                                </q-form>
                            </q-card-section>
                            <q-card-actions class="q-px-lg">
                                <q-btn type="submit"
                                       form="loginForm"
                                       size="lg"
                                       color="purple-4"
                                       class="full-width text-white"
                                       label="Войти"
                                       :loading="loading"

                                       unelevated/>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import security from "src/helpers/security";

export default {
    name: "Login",
    data() {
        return {
            loading: false,
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.loading) return;

            this.loading = true;

            this.$api({
                url: '/login',
                method: 'post',
                data: {
                    username: this.username,
                    password: this.password
                }
            }).then(response => {
                const {token, refreshToken} = response.data;

                security.setToken(token);
                security.setRefreshToken(refreshToken);

                this.$store.dispatch('initApp')
                    .then(() => {
                        this.loading = false;
                    }).catch(error => {
                    this.loading = false;

                    this.$q.notify({
                        type: 'negative',
                        message: 'Неудалось войти в систему',
                        position: 'top-right',
                        classes: 'glossy'
                    })
                })
            }).catch(error => {
                this.loading = false;

                this.$q.notify({
                    type: 'negative',
                    message: 'Неверно введено имя пользователя или пароль',
                    position: 'top-right',
                    classes: 'glossy'
                });
            })
        }
    }
}
</script>
