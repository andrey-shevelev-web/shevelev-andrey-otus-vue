import router from '@/router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

export function registerPlugins(app) {
  app.use(router);
  app.use(PrimeVue);
  app.use(ToastService);
}
