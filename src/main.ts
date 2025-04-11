import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import Toast from 'vue-toastification';
// Import the CSS
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(router);

// Toast options (optional)

app.use(Toast);
app.mount('#app');
