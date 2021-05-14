<template>
    <div class="q-pa-lg">
        <div class="column q-gutter-y-md">
            <q-card class="bg-cyan-10 text-white shadow-0" style="height: 36px;" square>
                <q-card-section class="q-py-sm">
                    <div class="row">
                        <div class="q-px-sm text-bold text-caption index">#</div>
                        <div class="q-px-sm text-bold text-caption username">Имя пользователя</div>
                        <div class="q-px-sm text-bold text-caption last-name">Фамилия</div>
                        <div class="q-px-sm text-bold text-caption first-name">Имя</div>
                        <div class="q-px-sm text-bold text-caption middle-name">Отчество</div>
                        <div class="q-px-sm text-bold text-caption actions"></div>
                    </div>
                </q-card-section>
            </q-card>

            <q-card v-for="(user, index) in users" :key="user.username" square>
                <q-card-section>
                    <div class="row">
                        <div class="q-px-sm index">{{ index + 1 }}</div>
                        <div class="q-px-sm username">{{ user.username }}</div>
                        <div class="q-px-sm last-name">{{ user.userData.lastName }}</div>
                        <div class="q-px-sm first-name">{{ user.userData.firstName }}</div>
                        <div class="q-px-sm middle-name">{{ user.userData.middleName }}</div>
                        <div class="q-px-sm actions">
                            <div class="q-gutter-x-md">
                                <q-btn
                                    label="Настроить права"
                                    size="sm"
                                    icon="mdi-badge-account-horizontal"
                                    color="indigo-6"
                                    class="no-border-radius"
                                    unelevated
                                />
                                <q-btn
                                    label="Удалить"
                                    size="sm"
                                    icon="mdi-delete"
                                    color="red"
                                    class="no-border-radius"
                                    unelevated
                                />
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        UserItem: () => import ('./UserItem')
    },
    computed: {
        users() {
            return this.$store.getters['pages/users/getUsers'] || []
        }
    },
    mounted() {
        if (null === this.$store.getters['pages/users/getUsers']) {
            this.$q.loading.show()

            this.$store.dispatch('pages/users/fetchUsers').then(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>

<style lang="scss">
.index {
    width: 50px;
}

.actions {
    width: 305px;
}

.username,
.last-name,
.first-name,
.middle-name {
    flex: 1;
}
</style>
