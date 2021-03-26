import Vue       from 'vue';
import VueRouter from 'vue-router';
import routes    from './routes';

Vue.use(VueRouter);

export default async function ({store}) {
    try {
        await store.dispatch('initApp');
    } catch (e) {}

    const Router = new VueRouter({
        scrollBehavior: () => ({x: 0, y: 0}),
        routes,

        // Leave these as they are and change in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        mode: process.env.VUE_ROUTER_MODE,
        // base: process.env.VUE_ROUTER_BASE
        base: process.env.DEV ? '/' : '/admin'
    });

    Router.beforeEach((to, from, next) => {
        const isAuthorized = store.getters['getIsAuthorized'];

        if (!isAuthorized && 'Login' !== to.name) return next('/login');
        if (isAuthorized && 'Login' === to.name) return next('/');

        next();
    });

    Router.onError(error => {
        console.log(error);
    })

    return Router;
}
