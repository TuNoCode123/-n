import { createRouter, createWebHistory } from "vue-router";

import { defineAsyncComponent } from "vue";
import Loading from "./loading.vue";
import { useAccountStore } from "./pinia/accountStore";
import "vue3-emoji-picker/css";
import Err from "./components/err.vue";
import Category from "./components/ecommerce/category/category.vue";
import Product from "./components/ecommerce/product/product.vue";
import Attribute from "./components/ecommerce/product/attribute/attribute.vue";
import { createShopProduct, findExistedShop } from "./pinia/productStore";
import Coupon from "./components/ecommerce/coupon/coupon.vue";

const Test = defineAsyncComponent(() => import("./components/main/Test.vue"));
const Dashboard = defineAsyncComponent({
  loader: () => import("./components/dashboard.vue"),
  loadingComponent: Loading,
});

const Message = defineAsyncComponent(
  () => import("./components/ecommerce/message/message.vue")
);
const DashboardShop = defineAsyncComponent(
  () => import("./components/ecommerce/dashboard/dashboardShop.vue")
);
const User = defineAsyncComponent(
  () => import("./components/ecommerce/user/user.vue")
);
const Comment = defineAsyncComponent(
  () => import("./components/ecommerce/comment/comment.vue")
);
const Order = defineAsyncComponent({
  loader: () => import("./components/ecommerce/order/order.vue"),
  loadingComponent: Loading,
});
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
      { path: "user", component: User },
      { path: "coupon", component: Coupon, meta: { requiresAuth: true } },
      { path: "order", component: Order, meta: { requiresAuth: true } },
      { path: "comment", component: Comment, meta: { requiresAuth: true } },
      {
        path: "dashboard",
        component: DashboardShop,
        meta: { requiresAuth: true },
      },
      { path: "message", component: Message, meta: { requiresAuth: true } },

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
  console.log("1");
  if (to.meta.requiresAuth) {
    if (!store.inforUser) {
      console.log("2");
      next("/err");
    } else {
      console.log("3");

      if (store.inforUser.roleId == "R1") {
        console.log("into R1");
        next();
      } else {
        console.log("into not R1");
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
      console.log("4");
    }
  } else {
    console.log("5");
    next();
  }
});
export default router;
