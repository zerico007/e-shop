import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/LoginView.vue";

const routes = [
  {
    path: "/e-shop",
    name: "Login",
    component: Login,
  },
  {
    path: "/e-shop/home",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
