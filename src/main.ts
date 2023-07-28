import "./assets/styles/main.scss";
import "virtual:uno.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import ToastService from "primevue/toastservice";

const app = createApp(App);

declare global {
    interface Window {
        familyTreeUpdateTimeOut: any;
        familyTreeRenameTimeOut: any;
    }
}

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
    ripple: true,
    inputStyle: "filled"
});
app.use(ToastService);

app.mount("#app");
