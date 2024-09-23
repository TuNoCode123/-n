<script setup lang="ts">
import { ref, provide, watch, reactive, toRaw, KeepAlive } from "vue";
import { VueSpinner } from "vue3-spinners";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {
  useCategoryStore,
  useDeleteCategoryStore,
  useUpdateCategoryStore,
} from "@/pinia/categoryStore";
import TableCategory from "./tableCategory.vue";
import { Icategory } from "@/interface/user";
import { copyObject } from "@/util/copy";

import { differentObject } from "@/util/relationShip";
import ModalUpdateCategory from "./modalUpdateCategory.vue";
import ModalCategory from "./modalCategory.vue";
const isOpen = ref(false);
const isOpenModalUpdate = ref(false);
const categoryStore = useCategoryStore();
watch(
  () => categoryStore.isEcCreate,
  async (n, o) => {
    if (n == 0) {
      toast.success(categoryStore.isEmCreat);
      await categoryStore.getAllCategory();
      categoryStore.$reset();
      isOpen.value = !isOpen.value;
    } else if (n == 1) {
      toast.error(categoryStore.isEmCreat);
      categoryStore.$reset();
    }
  }
);
const category = ref();
provide("category", category);
const initCategory = ref<Partial<Icategory>>();
const currentCategory = reactive<Partial<Icategory>>({});
function hanlderClickUpdate(cate: Icategory) {
  Object.assign(currentCategory, cate);
  initCategory.value = copyObject(cate);
  isOpenModalUpdate.value = !isOpenModalUpdate.value;
}
const useUpdateCate = useUpdateCategoryStore();
async function hanlderSubmitUpdate() {
  const newCate = differentObject(
    toRaw(currentCategory),
    toRaw(initCategory.value)
  );
  await useUpdateCate.updateCategory({
    id: currentCategory.id,
    publicId: currentCategory.publicId,
    parentId: category.value ? category.value : currentCategory.parentId,
    ...newCate,
  });
}
watch(
  () => useUpdateCate.isEc,
  async (n, o) => {
    if (n == 0) {
      toast.success(useUpdateCate.isEM);
      isOpenModalUpdate.value = !isOpenModalUpdate.value;
      await categoryStore.getAllCategory();
      useUpdateCate.$reset();
    } else if (n == 1) {
      toast.error(useUpdateCate.isEM);
      useUpdateCate.$reset();
    }
  }
);

const currentPage = ref<number>(0);
const limit = ref<number>(5);
function getCurrentPageCateGory(page: number) {
  currentPage.value = page;
}
watch(
  () => currentPage.value,
  async (n, o) => {
    console.log("new", n);
    await categoryStore.getAllCategory(currentPage.value - 1, limit.value);
  }
);

const deleteCategoryStore = useDeleteCategoryStore();

watch(
  () => deleteCategoryStore.isEc,
  async (n, o) => {
    if (n == 0) {
      toast.success(deleteCategoryStore.isEM);
      isOpenModalUpdate.value = false;
      await categoryStore.getAllCategory();
      deleteCategoryStore.$reset();
    } else if (n == 1) {
      toast.error(deleteCategoryStore.isEM);
      deleteCategoryStore.$reset();
    }
  }
);
provide("getCurrentPageCateGory", getCurrentPageCateGory);
provide("currentCategory", currentCategory);
provide("hanlderSubmitUpdateCategory", hanlderSubmitUpdate);
</script>

<template>
  <div>
    <div class="text-3xl p-2">Manage Categories</div>

    <div class="m-2">
      <KeepAlive>
        <ModalCategory v-model:isOpenCategory="isOpen" />
      </KeepAlive>
    </div>
    <VueSpinner
      v-if="deleteCategoryStore.isLoading"
      size="45"
      color="rgb(93, 197, 150)"
    />
    <div v-else class="p-4s">
      <TableCategory
        :data="toRaw(categoryStore.listCategory)"
        @click-button="hanlderClickUpdate"
      />
    </div>
    <div>
      <ModalUpdateCategory v-model:isOpenModalUpdate="isOpenModalUpdate" />
    </div>
  </div>
</template>

<style scoped></style>
