import { createRouter, createWebHashHistory } from "vue-router";

const path = require("path");
const files = require.context("@/pages", true, /index\.vue$/);
const routes = [
  {
    path: "/",
    name: "Index",
    component: import("../pages/Home/index.vue"),
  },
];
files.keys().forEach((key) => {
  const fileName = key.match(/[A-Z]{1}[a-z]+/g)[0];
  console.log(fileName);
  const component = files(key).default || files(key);
  routes.push({
    path: "/" + fileName.toLowerCase(),
    name: fileName,
    component,
  });
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
