import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/LoginView.vue";

const routes = [
  {
    path: "/e-shop",
    name: "Login",
    component: Login,
  },
  {
    path: "/e-shop/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/e-shop/home",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/e-shop/products",
    name: "Products",
    component: () => import("../views/ProductsView.vue"),
  },
  {
    path: "/e-shop/orders",
    name: "Orders",
    component: () => import("../views/OrdersView.vue"),
  },
  {
    path: "/e-shop/change-password",
    name: "ChangePassword",
    component: () => import("../views/ChangePasswordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
