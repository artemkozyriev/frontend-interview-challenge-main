import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Cart from "@/pages/Cart.vue";
import Admin from "@/pages/Admin.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
  { path: "/admin", component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
