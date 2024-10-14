import { createRouter, createWebHistory } from "vue-router";

import { defineAsyncComponent } from "vue";
import Loading from "./loading.vue";
import { useAccountStore } from "./pinia/accountStore";

import Err from "./components/err.vue";
import Category from "./components/ecommerce/category/category.vue";
import Product from "./components/ecommerce/product/product.vue";
import Attribute from "./components/ecommerce/product/attribute/attribute.vue";
import { createShopProduct, findExistedShop } from "./pinia/productStore";

const Test = defineAsyncComponent(() => import("./components/main/Test.vue"));
const Dashboard = defineAsyncComponent({
  loader: () => import("./components/dashboard.vue"),
  loadingComponent: Loading,
});
const User = defineAsyncComponent(
  () => import("./components/ecommerce/user/user.vue")
);
const Shop = defineAsyncComponent(
  () => import("./components/ecommerce/shop/shop.vue")
);

const routes = [
  {
    path: "/",
    component: Dashboard,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "product",
        name: "product",
        component: Product,
        meta: { requiresAuth: true },
      },
      { path: "attribute", component: Attribute, meta: { requiresAuth: true } },
      { path: "category", component: Category, meta: { requiresAuth: true } },
      { path: "user", component: User, meta: { requiresAuth: true } },
      { path: "err", component: Err },
      { path: "shop", component: Shop },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useAccountStore();
  const shop = createShopProduct();
  const findShop = findExistedShop();
  if (to.meta.requiresAuth) {
    if (!store.inforUser) {
      next("/err");
    } else {
      if (store.inforUser.roleId == "R1") {
        next();
      } else {
        if (findShop.isEc == 0 && findShop.shop != null) {
          if (to.path == "/shop") {
            next("/err");
          } else {
            next();
          }
        } else {
          if (to.path === "/shop") {
            next();
          } else {
            next("/shop");
          }
        }
      }
    }
  } else {
    next();
  }
});
export default router;
