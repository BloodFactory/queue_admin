const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                name: 'Homepage',
                path: '',
                component: () => import('pages/homepage')
            },
            {
                name: 'Users',
                path: '/users',
                component: () => import('pages/users/Index.vue')
            },
            {
                name: 'Organizations',
                path: '/organizations',
                component: () => import('pages/organizations/Index.vue')
            },
            {
                name: 'Services',
                path: '/services',
                component: () => import('pages/services/Index.vue')
            }
        ]
    },
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
