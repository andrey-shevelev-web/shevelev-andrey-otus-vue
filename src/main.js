import { createApp } from 'vue';
import App from '@/App.vue';
import { registerPlugins } from '@/plugins';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
registerPlugins(app);
app.directive('tooltip', Tooltip);
app.mount('#app');
