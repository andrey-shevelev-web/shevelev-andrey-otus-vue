import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware';
import AppProductList from '@/components/AppProductList.vue';
import AppSignin from '@/components/AppSignin.vue';
import { isUserAuthenticated } from '@/services/AuthService';

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'ProductList'
    }
  },
  {
    path: '/products',
    name: 'ProductList',
    component: AppProductList,
    meta: { requiredAuth: true }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: AppSignin,
    meta: {
      layout: 'signin'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.meta?.requiredAuth && !isUserAuthenticated()) {
    next({
      name: 'Signin'
    });
  }
  next();
});

router.beforeEach(loadLayoutMiddleware);

export default router;
