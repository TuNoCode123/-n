<script setup lang="ts">
import { ref, provide, watch, KeepAlive } from "vue";
import AccodianProduct from "./accodianProduct.vue";
import TableProduct from "./tableProduct.vue";
import { useCreateProduct, useDeleteProductStore } from "@/pinia/productStore";
import { toast } from "vue3-toastify";

const currentPage = ref<number>(0);
const limit = ref<number>(5);
function getCurrentPageProduct(page: number) {
  currentPage.value = page;
}
const productStore = useCreateProduct();

watch(
  () => currentPage.value,
  async (n, o) => {
    await productStore.getAllProduct(currentPage.value - 1, limit.value);
  }
);
const deleteProduct = useDeleteProductStore();
watch(
  () => deleteProduct.isEc,
  (n) => {
    if (n == 0) {
      toast.success(deleteProduct.isEM);
      setTimeout(async () => {
        await productStore.getAllProduct();
      }, 300);
      deleteProduct.$reset();
    } else if (n == 1) {
      toast.error(deleteProduct.isEM);
      deleteProduct.$reset();
    }
  }
);
provide("getCurrentPageProduct", getCurrentPageProduct);
</script>

<template>
  <div>
    <div class="text-3xl p-2">Manage Product</div>

    <div class="m-2 w-2/3">
      <KeepAlive>
        <AccodianProduct />
      </KeepAlive>
    </div>
    <VueSpinner
      v-if="deleteProduct.isLoading"
      size="45"
      color="rgb(93, 197, 150)"
    />
    <div class="p-4s">
      <TableProduct />
    </div>
  </div>
</template>

<style scoped></style>
