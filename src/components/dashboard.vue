<script setup lang="ts">
import { RouterView } from "vue-router";

import Bar from "./bar/Bar.vue";
import Menu from "./ecommerce/user/header/Menu.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/pinia/userStore";
import { useCategoryStore } from "@/pinia/categoryStore";
const categoryStore = useCategoryStore();
import { useScroll } from "@vueuse/core";
import { findExistedShop, useCreateProduct } from "@/pinia/productStore";
const store = useUserStore();
const useProduct = useCreateProduct();
const shop = findExistedShop();
onMounted(async () => {
  await Promise.all([
    store.getAllUser(0, 5),
    categoryStore.getAllCategoryNoPaginate(),
    categoryStore.getAllCategory(),
    // useProduct.getAllProduct(undefined, undefined, shop.shop?.id),
    store.getType("gender"),
    store.getRoleId("role"),
  ]);
});
const el = ref<HTMLElement | null>(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
</script>

<template>
  <div class="flex w-full items-start">
    <div class="w-1/5 md:w-1/5 xl:w-1/5 bg-colorBar">
      <Bar />
    </div>
    <div
      class="w-4/5 md:w-4/5 xl:w-4/5 h-dvh overflow-y-scroll bg-colorRight mb-28 var2"
      ref="el"
    >
      <div><Menu /></div>
      <div class="w-11/12 mt-3 shadow-md mx-auto bg-colorMenu p-2 h-fit">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.var2 {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
