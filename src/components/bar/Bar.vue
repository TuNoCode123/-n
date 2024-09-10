<script setup lang="ts">
import Product from "./product/product.vue";
</script>

<template>
  <div class="w-full shadow-md">
    <div class="h-14 flex justify-center items-center">
      <div class="text-2xl font-semibold">system</div>
    </div>
    <hr class="border-t-2 border-gray-300 my-4" />
    <span class="text-sm font-medium text-neutral-500 ml-2">Apps & Pages</span>
    <div class="flex items-center gap-3">
      <Product />
    </div>
  </div>
</template>

<style scoped></style>
