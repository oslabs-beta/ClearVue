import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TreeViz from '../views/TreeViz.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TreeViz',
    component: TreeViz,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/circle-pack',
    name: 'CirclePack',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CirclePack.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
