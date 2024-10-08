import { createRouter, createWebHistory } from "vue-router";

import { defineAsyncComponent } from "vue";
import Loading from "./loading.vue";
import { useAccountStore } from "./pinia/accountStore";
import Err from "./components/err.vue";
import Category from "./components/ecommerce/category/category.vue";
import Product from "./components/ecommerce/product/product.vue";
import Attribute from "./components/ecommerce/product/attribute/attribute.vue";

const Test = defineAsyncComponent(() => import("./components/main/Test.vue"));
const Dashboard = defineAsyncComponent({
  loader: () => import("./components/dashboard.vue"),
  loadingComponent: Loading,
});
const User = defineAsyncComponent(
  () => import("./components/ecommerce/user/user.vue")
);

const routes = [
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "product", component: Product },
      { path: "attribute", component: Attribute },
      { path: "category", component: Category },
      { path: "user", component: User, meta: { requiresAuth: true } },
      { path: "err", component: Err },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach((to, from, next) => {
//   // ✅ This will work because the router starts its navigation after
//   // the router is installed and pinia will be installed too
//   const store = useAccountStore();
//   if (to.meta.requiresAuth) {
//     if (!store.inforUser) {
//       next("/err");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
export default router;
