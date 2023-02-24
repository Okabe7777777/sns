import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routes";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router).use(createPinia());

app.mount("#app");
