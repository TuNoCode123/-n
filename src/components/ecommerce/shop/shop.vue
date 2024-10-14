<script setup lang="ts">
import { Icategory, Ishop } from "@/interface/user";
import { useAccountStore } from "@/pinia/accountStore";
import { createShopProduct } from "@/pinia/productStore";
import { convertFileIntoBase64 } from "@/util/convert";

import { nextTick, reactive, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();
const preImg = ref<any>("");
const preBacklog = ref<any>("");
const shop = reactive<Partial<Ishop>>({});
const user = useAccountStore();
async function onChangeInputCategory(event: Event, type: keyof Ishop) {
  if (type == "image" || type == "backlog") {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const fileImg = input.files[0] as File;
      const imgBase64 = await convertFileIntoBase64(fileImg);
      if (type == "image") {
        preImg.value = imgBase64;
      } else {
        preBacklog.value = imgBase64;
      }
      shop[type] = fileImg;
      // inforCate[type] = fileImg;
    }
    return;
  }
  const input = event.target as HTMLInputElement;
  shop[type] = input.value;
}
const shopProduct = createShopProduct();
async function hanlderOnclickSubmit() {
  shop["userId"] = user.inforUser?.id;
  await shopProduct.createNewShop(shop);
}
watch(
  () => shopProduct.isEc,
  (n) => {
    if (n == 0) {
      toast.success(shopProduct.isEM);
      setTimeout(() => {
        router.replace("/");
      }, 1000);

      shopProduct.reset();

      return;
    } else if (n == 1) {
      toast.error(shopProduct.isEM);
      shopProduct.reset();
    }
  }
);
</script>

<template>
  <div class="p-2">
    <div class="text-3xl mb-3">Tạo Cửa Hàng Cho Riêng Bạn</div>
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            @input="(e) => onChangeInputCategory(e, 'name')"
          />
          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Address
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="12 Street"
            @input="(e) => onChangeInputCategory(e, 'address')"
          />
          <p class="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Description</label
          >
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write desciption for your shop..."
            @input="(e) => onChangeInputCategory(e, 'description')"
          ></textarea>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div>
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
              <span v-else>Select Logo</span>
            </label>
          </div>
        </div>

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div>
            <input
              type="file"
              name="img1"
              id="img1"
              @input="(e) => onChangeInputCategory(e, 'backlog')"
              hidden
            />
          </div>
          <div class="w-40 h-14 mx-auto">
            <label
              class="flex justify-center items-center text-gray-400 text-sm w-full h-full mx-auto border-dashed border-2 border-zinc-600"
              for="img1"
            >
              <div v-if="preBacklog" class="w-9/12 h-full mx-auto">
                <img :src="preBacklog" class="w-full h-full object-contain" />
              </div>
              <span v-else>Select Backlog</span>
            </label>
          </div>
        </div>
      </div>
      <div class="w-full md:w-full px-3 mb-6 md:mb-0 mt-3">
        <button
          type="button"
          @click="hanlderOnclickSubmit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          submit
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
