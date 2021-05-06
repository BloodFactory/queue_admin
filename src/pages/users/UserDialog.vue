<template>
    <q-dialog ref="dialog" @hide="onReset" persistent>
        <q-card style="width: 800px; max-width: 800px">
            <q-card-section class="bg-primary text-white">
                <div class="text-h6">Пользователь</div>
            </q-card-section>

            <q-card-section>
                <q-form id="userForm" @submit.prevent="submit">
                    <q-input label="Имя пользователя"
                             v-model="username"
                             :rules="[val => !!val || 'Введите имя пользователя']"/>

                    <div class="row q-col-gutter-lg">
                        <div class="col">
                            <q-input label="Пароль"
                                     :type="isPassword ? 'password' : 'text'"
                                     v-model="password"
                                     :rules="[val => id || !!val || 'Введите пароль']">
                                <template v-slot:append>
                                    <q-icon :name="isPassword ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPassword = !isPassword"/>
                                </template>
                            </q-input>
                        </div>
                        <div class="col">
                            <q-input label="Пароль (ещё раз)"
                                     :type="isConfirmPassword ? 'password' : 'text'"
                                     v-model="confirmPassword"
                                     :rules="[val => id || !!val || 'Введите подтверждение пароля', val => val === password || 'Не соответствует паролю']">
                                <template v-slot:append>
                                    <q-icon :name="isConfirmPassword ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isConfirmPassword = !isConfirmPassword"/>
                                </template>
                            </q-input>
                        </div>
                    </div>

                    <OrganizationSelect v-model="organization" required/>

                    <OrganizationSelect v-if="hasBranches"
                                        v-model="branch"
                                        :parent="organization ? organization.id : null"
                                        label="Филиал"/>

                    <div class="text-h6 q-mt-lg">Личные даные</div>

                    <div class="row q-col-gutter-lg">
                        <div class="col">
                            <q-input label="Фамилия"
                                     v-model="userData.lastName"
                                     :rules="[val => !!val || 'Введите фамилию']"/>
                        </div>
                        <div class="col">
                            <q-input label="Имя"
                                     v-model="userData.firstName"
                                     :rules="[val => id || !!val || 'Введите имя']"/>
                        </div>
                        <div class="col">
                            <q-input label="Отчество"
                                     v-model="userData.middleName"/>
                        </div>
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn form="userForm" type="submit" label="Сохранить" color="green" unelevated/>
                <q-btn form="userForm" label="Отмена" color="red" unelevated v-close-popup/>
            </q-card-actions>

            <q-inner-loading :showing="loading">
                <q-spinner-hourglass size="50px" color="primary"/>
            </q-inner-loading>
        </q-card>
    </q-dialog>
</template>

<script>
import OrganizationSelect from "components/selects/OrganizationSelect";

export default {
    name: "UserDialog",
    components: {OrganizationSelect},
    data() {
        return {
            id: null,
            loading: false,
            username: '',
            password: '',
            confirmPassword: '',
            organization: '',
            branch: '',
            userData: {
                lastName: '',
                firstName: '',
                middleName: ''
            },
            rights: {
                admin: false
            },
            isPassword: true,
            isConfirmPassword: true
        }
    },
    computed: {
        hasBranches() {
            return this.organization && this.organization.hasOwnProperty('branches');
        }
    },
    methods: {
        close() {
            this.$refs.userForm.reset()
        },
        show(id) {
            this.$refs.dialog.show();

            if (null !== id) {
                this.loading = true;

                this.$api({
                    url: '/users/' + id,
                    method: 'get'
                }).then(response => {
                    const {id, username, organization, userData} = response.data;

                    const organizations = this.$store.getters['dictionary/organizations/getOptions'];

                    organization: for (let _organization of organizations) {
                        if (organization === _organization.id) {
                            this.organization = _organization;
                            break;
                        }

                        if (_organization.hasOwnProperty('branches')) {
                            for (let branch of _organization.branches) {
                                if (organization === branch.id) {
                                    this.organization = _organization;
                                    this.branch       = branch;
                                    break organization;
                                }
                            }
                        }
                    }

                    this.id       = id;
                    this.username = username;
                    this.userData = userData;

                    this.$refs.dialog.show();
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        submit() {
            this.loading = true;

            const url = ['/users'];

            const data = {
                username: this.username,
                password: this.password,
                confirmPassword: this.confirmPassword,
                userData: this.userData
            };

            if (this.branch) {
                data.organization = this.branch.id;
            } else {
                data.organization = this.organization.id;
            }

            if (this.id) {
                url.push(this.id)
            }

            this.$api({
                url: url.join('/'),
                method: 'post',
                data
            }).then(response => {
                this.$refs.dialog.hide();
                this.$emit('save');
            }).catch(error => {
                this.$q.notify({
                    message: 'Не удалось сохранить',
                    type: 'negative'
                });
            }).finally(() => {
                this.loading = false;
            });
        },
        onReset() {
            this.id              = null;
            this.username        = '';
            this.password        = '';
            this.confirmPassword = '';
            this.organization    = '';
            this.userData        = {
                lastName: '',
                firstName: '',
                middleName: ''
            }
        }
    },
    watch: {
        organization(val) {
            if (!val || !val.branches) {
                this.branch = null;
            }
        }
    }
}
</script>
