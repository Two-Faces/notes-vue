import VueRouter from 'vue-router'
import Vue from 'vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("../components/Home"),
        },
        {
            path: '/note/create',
            name: 'create',
            component: () => import("../components/Create"),
        },
        {
            path: '/note/:id/edit',
            name: 'edit',
            component: () => import("../components/Edit"),
        }
    ]
});

export default router;
