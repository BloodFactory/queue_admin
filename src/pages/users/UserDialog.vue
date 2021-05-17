<template>
    <q-dialog ref="dialog">
        <q-card style="width: 650px">
            <q-bar class="bg-light-blue-10 text-white">
                <div class="text-bold">Пользователь</div>
                <q-space/>
                <q-btn
                    icon="close"
                    flat dense v-close-popup
                />
            </q-bar>

            <q-card-section>
                <q-form id="userForm" @submit="save">
                    <q-input
                        label="Имя пользователя"
                        v-model="form.username"
                        :rules="[val => !!val || 'Введите имя пользователя']"
                        outlined clearable
                    />

                    <div class="row q-col-gutter-lg">
                        <div class="col">
                            <q-input
                                label="Пароль"
                                :type="isPassword ? 'password' : 'text'"
                                v-model="form.password"
                                :rules="[val => id || !!val || 'Введите пароль']"
                                outlined clearable
                            >
                                <template v-slot:append>
                                    <q-icon :name="isPassword ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPassword = !isPassword"/>
                                </template>
                            </q-input>
                        </div>
                        <div class="col">
                            <q-input
                                label="Пароль (ещё раз)"
                                :type="isConfirmPassword ? 'password' : 'text'"
                                v-model="form.confirmPassword"
                                :rules="[val => id || !!val || 'Введите подтверждение пароля', val => val === form.password || 'Не соответствует паролю']"
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
                                v-model="form.userData.lastName"
                                :rules="[val => !!val || 'Введите фамилию']"
                                outlined clearable
                            />
                        </div>
                        <div class="col">
                            <q-input
                                label="Имя"
                                v-model="form.userData.firstName"
                                :rules="[val => id || !!val || 'Введите имя']"
                                outlined clearable
                            />
                        </div>
                        <div class="col">
                            <q-input
                                label="Отчество"
                                v-model="form.userData.middleName"
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
            id: null,
            isPassword: true,
            isConfirmPassword: true,
            form: {
                username: '',
                password: '',
                confirmPassword: '',
                organization: null,
                userData: {
                    lastName: '',
                    firstName: '',
                    middleName: ''
                }
            }
        }
    },
    methods: {
        show() {
            this.$refs.dialog.show()
        },
        save() {
            this.$q.loading.show()

            const data = new FormData()

            data.append('username', this.form.username)
            data.append('password', this.form.password)
            data.append('confirmPassword', this.form.confirmPassword)
            data.append('userData[lastName]', this.form.userData.lastName)
            data.append('userData[firstName]', this.form.userData.firstName)
            data.append('userData[middleName]', this.form.userData.middleName)

            let url = '/users'

            if (this.id) url += '/' + this.id

            this.$api({
                url,
                method: 'post',
                data
            }).then(() => {
                return this.$store.dispatch('pages/users/fetchUsers')
            }).then(() => {
                this.$refs.dialog.hide()
            }).finally(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>
