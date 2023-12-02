import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware';
import ProductList from '@/components/ProductList.vue';
import Cart from '@/components/Cart.vue';
import OrderForm from '@/components/OrderForm.vue';
import SigninForm from '@/components/SigninForm.vue';
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
    component: ProductList,
    meta: { requiredAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiredAuth: true }
  },
  {
    path: '/checkout',
    name: 'OrderForm',
    component: OrderForm,
    meta: { requiredAuth: true }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninForm,
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
