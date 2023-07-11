import './assets/styles/main.scss'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"
const app = createApp(App)
import ToastService from 'primevue/toastservice';

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    ripple: true,
    inputStyle: "filled"
});
app.use(ToastService);

app.mount('#app')
