import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import VueFeather from "vue-feather";

import "./styles/style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component(VueFeather.name, VueFeather);

app.use(VueQueryPlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");
