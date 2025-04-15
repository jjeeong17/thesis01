// src/router.js

import * as VueRouter from "vue-router";
import IntroSection from "./components/IntroSection.vue";

const routes = [{ path: "/", component: IntroSection }];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
