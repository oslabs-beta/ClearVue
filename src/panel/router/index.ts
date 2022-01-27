import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TreeView from '../views/TreeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TreeView',
    component: TreeView,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/circle-pack-view',
    name: 'CircleView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CircleView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
