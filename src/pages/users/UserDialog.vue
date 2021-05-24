<template>
    <q-dialog v-model="dialog">
        <q-card style="min-width: 850px; width: 850px">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Пользователь</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="userForm" @submit="$store.dispatch('dialogs/user/save')">
                    <div class="row q-col-gutter-lg">
                        <div class="col-4">
                            <q-input
                                label="Имя пользователя"
                                v-model="username"
                                :rules="[val => !!val || 'Введите имя пользователя']"
                                outlined clearable
                            />
                        </div>
                        <div class="col-4">
                            <q-input
                                label="Пароль"
                                :type="isPassword ? 'password' : 'text'"
                                v-model="password"
                                :rules="[val => id || !!val || 'Введите пароль']"
                                outlined clearable
                            >
                                <template v-slot:append>
                                    <q-icon
                                        :name="isPassword ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPassword = !isPassword"
                                    />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-4">
                            <q-input
                                label="Повторите пароль"
                                :type="isConfirmPassword ? 'password' : 'text'"
                                v-model="confirmPassword"
                                :rules="[val => id || !!val || 'Введите подтверждение пароля', val => val === password || 'Не соответствует паролю']"
                                outlined clearable
                            >
                                <template v-slot:append>
                                    <q-icon :name="isConfirmPassword ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isConfirmPassword = !isConfirmPassword"/>
                                </template>
                            </q-input>
                        </div>
                    </div>

                    <div class="text-h6 q-mt-lg">Личные даные</div>

                    <div class="row q-col-gutter-lg">
                        <div class="col">
                            <q-input
                                label="Фамилия"
                                v-model="lastName"
                                :rules="[val => !!val || 'Введите фамилию']"
                                outlined clearable
                            />
                        </div>
                        <div class="col">
                            <q-input
                                label="Имя"
                                v-model="firstName"
                                :rules="[val => id || !!val || 'Введите имя']"
                                outlined clearable
                            />
                        </div>
                        <div class="col">
                            <q-input
                                label="Отчество"
                                v-model="middleName"
                                outlined clearable
                            />
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
                <q-btn label="Сохранить" color="green" type="submit" form="userForm" flat/>
                <q-btn label="Отмена" color="red" v-close-popup flat/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    data() {
        return {
            isPassword: true,
            isConfirmPassword: true
        }
    },
    computed: {
        id: {
            get() {
                return this.$store.getters['dialogs/user/getId']
            },
            set(id) {
                this.$store.commit('dialogs/user/setId', id)
            }
        },
        dialog: {
            get() {
                return this.$store.getters['dialogs/user/getDialog']
            },
            set(dialog) {
                this.$store.commit('dialogs/user/setDialog', dialog)
            }
        },
        password: {
            get() {
                return this.$store.getters['dialogs/user/getPassword']
            },
            set(password) {
                this.$store.commit('dialogs/user/setPassword', password)
            }
        },
        confirmPassword: {
            get() {
                return this.$store.getters['dialogs/user/getConfirmPassword']
            },
            set(confirmPassword) {
                this.$store.commit('dialogs/user/setConfirmPassword', confirmPassword)
            }
        },
        username: {
            get() {
                return this.$store.getters['dialogs/user/getUsername']
            },
            set(username) {
                this.$store.commit('dialogs/user/setUsername', username)
            }
        },
        lastName: {
            get() {
                return this.$store.getters['dialogs/user/getLastName']
            },
            set(lastName) {
                this.$store.commit('dialogs/user/setLastName', lastName)
            }
        },
        firstName: {
            get() {
                return this.$store.getters['dialogs/user/getFirstName']
            },
            set(firstName) {
                this.$store.commit('dialogs/user/setFirstName', firstName)
            }
        },
        middleName: {
            get() {
                return this.$store.getters['dialogs/user/getMiddleName']
            },
            set(middleName) {
                this.$store.commit('dialogs/user/setMiddleName', middleName)
            }
        }
    }
}
</script>
