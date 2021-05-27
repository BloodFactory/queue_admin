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
                path: 'users',
                component: () => import('pages/users/Index')
            },
            {
                name: 'Organizations',
                path: 'organizations',
                component: () => import('pages/organizations/Index')
            },
            {
                name: 'Services',
                path: 'services',
                component: () => import('pages/services/Index')
            }
        ]
    },
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
