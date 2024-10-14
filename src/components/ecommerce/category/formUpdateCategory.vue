<script setup lang="ts">
import { Icategory, Iuser } from "@/interface/user";
import { useUpdateUserStore, useUserStore } from "@/pinia/userStore";

import Select from "../../shareComponent/select.vue";
import { computed, inject, reactive, ref, toRaw, watch } from "vue";
import { VueSpinner } from "vue3-spinners";
import {
  useCategoryStore,
  useUpdateCategoryStore,
} from "@/pinia/categoryStore";
import { convertFileIntoBase64 } from "@/util/convert";
import { toast } from "vue3-toastify";
const categoryStore = useCategoryStore();
const updateCateStore = useUpdateCategoryStore();
const category = inject<number>("category");
const preImg = ref<any>("");
const currentCategory = inject<Icategory>("currentCategory");
const initCategory = ref();
initCategory.value = computed(() =>
  categoryStore &&
  categoryStore.listCategory &&
  categoryStore.listCategory.data &&
  categoryStore.listCategory.data.length > 0
    ? categoryStore.listCategory.data[0].id
    : undefined
);
const listItem = computed(() =>
  categoryStore.listCategoryNoPaginate
    ? toRaw(categoryStore.listCategoryNoPaginate)
    : undefined
);

const inforCate = reactive<Partial<Icategory>>({});

async function onChangeInputCategory(event: Event, type: keyof Icategory) {
  if (!currentCategory) return;
  if (type == "image") {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const fileImg = input.files[0] as File;
      const imgBase64 = await convertFileIntoBase64(fileImg);
      preImg.value = imgBase64;
      currentCategory[type] = fileImg;
    }
    return;
  }
  const input = event.target as HTMLInputElement;
  currentCategory[type] = input.value;
}
const hanlderSubmitUpdateCategory = inject<() => void>(
  "hanlderSubmitUpdateCategory"
);
</script>

<template>
  <form class="w-full max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
      <input
        type="email"
        name="floating_email"
        id="floating_email"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        :value="currentCategory?.nameVi"
        @input="(e) => onChangeInputCategory(e, 'nameVi')"
      />
      <label
        for="floating_email"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Name (Tiếng Việt)
      </label>
    </div>
    <div class="grid md:grid-cols-1 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_first_name"
          id="floating_first_name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          :value="currentCategory?.nameEn"
          @input="(e) => onChangeInputCategory(e, 'nameEn')"
        />
        <label
          for="floating_first_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Name (English)</label
        >
      </div>
    </div>

    <div class="grid md:grid-cols-1 md:gap-6">
      <div class="relative z-0 w-full mb-5">
        <Select
          :listItemCategory="listItem"
          v-model:gender="category"
          type="category"
          :defautvalue="currentCategory?.parentId"
        />
      </div>
    </div>
    <div>
      <label for="img"></label>
      <input
        type="file"
        name="img"
        id="img"
        @input="(e) => onChangeInputCategory(e, 'image')"
        hidden
      />
    </div>
    <div class="w-40 h-14 mx-auto">
      <label
        class="flex justify-center items-center text-gray-400 text-sm w-full h-full mx-auto border-dashed border-2 border-zinc-600"
        for="img"
      >
        <div v-if="preImg" class="w-9/12 h-full mx-auto">
          <img :src="preImg" class="w-full h-full object-contain" />
        </div>
        <div v-else-if="currentCategory?.image" class="w-9/12 h-full mx-auto">
          <img
            :src="currentCategory?.image"
            class="w-full h-full object-contain"
          />
        </div>
        <span v-else>Select Img</span>
      </label>
    </div>
    <VueSpinner
      v-if="updateCateStore.isLoading"
      size="45"
      color="rgb(93, 197, 150)"
    />
    <button
      v-else
      @click="hanlderSubmitUpdateCategory"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Update
    </button>
  </form>
</template>

<style scoped></style>
