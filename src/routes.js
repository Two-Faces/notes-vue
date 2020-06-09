import VueRouter from 'vue-router'
import Vue from 'vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'app',
            component: () => import("./Home"),
        }
    ]
});

export default router;
