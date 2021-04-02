<template>
    <q-drawer v-model="value"
              show-if-above
              bordered
              content-class="bg-grey-1">
        <q-list>
            <q-item-label header
                          class="text-grey-8">
                Меню
            </q-item-label>

            <q-item v-for="(page, index) in pages"
                    :key="index"
                    :exact="page.route === 'Homepage'"
                    :to="{name: page.route}"
                    v-if="$can('open', page.route)"
                    clickable>
                <q-item-section avatar>
                    <q-icon :name="page.icon"/>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ page.label }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>

<script>

export default {
    name: "SideNavigation",
    props: ['value'],
    data() {
        return {
            pages: [
                {
                    label: 'Главная',
                    icon: 'mdi-home',
                    route: 'Homepage'
                },
                {
                    label: 'Натройки',
                    icon: 'mdi-cogs',
                    route: 'Settings'
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
    }
}
</script>
