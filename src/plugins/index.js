import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

export function registerPlugins(app) {
  app.use(router);
  app.use(createPinia());
  app.use(PrimeVue);
  app.use(ToastService);
}
