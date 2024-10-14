import { createApp } from 'vue';
import { MotionPlugin } from '@vueuse/motion';
import BootstrapVue3 from 'bootstrap-vue-3';
import './style/general.scss'
import App from './App.vue';

// Importa i file CSS di Bootstrap e BootstrapVue3
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);

// Usa il plugin di BootstrapVue3
app.use(BootstrapVue3);
app.use(MotionPlugin);
app.mount('#app');
