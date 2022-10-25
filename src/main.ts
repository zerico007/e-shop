import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import VueFeather from "vue-feather";
import vSelect from "vue-select";
import VueClickAway from "vue3-click-away";

import "vue-select/dist/vue-select.css";

import "./styles/style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component(VueFeather.name, VueFeather);
app.component("v-select", vSelect);

app.use(VueQueryPlugin);
app.use(VueClickAway);
app.use(createPinia());
app.use(router);

app.mount("#app");
