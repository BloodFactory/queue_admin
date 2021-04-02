const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                name: 'Homepage',
                path: '',
                component: () => import('pages/Index.vue')
            },
            {
                name: 'Settings',
                path: '/settings',
                component: () => import('pages/Settings.vue')
            },
            {
                name: 'Users',
                path: '/users',
                component: () => import('pages/Users.vue')
            },
            {
                name: 'Organizations',
                path: '/organizations',
                component: () => import('pages/Organizations.vue')
            },
            {
                name: 'Services',
                path: '/services',
                component: () => import('pages/Services.vue')
            }
        ]
    },
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
