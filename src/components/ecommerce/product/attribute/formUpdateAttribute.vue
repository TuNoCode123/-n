<script setup lang="ts">
import { Iattribute } from "@/interface/user";
import { updateAttributeOfProduct } from "@/pinia/productStore";

import { inject } from "vue";

const currentAttribute = inject<Iattribute>("currentAttribute");
const updateAttibute = updateAttributeOfProduct();
async function onChangeInputAttribute(event: Event, type: keyof Iattribute) {
  if (!currentAttribute) return;
  const input = event.target as HTMLInputElement;
  currentAttribute[type] = input.value;
}
const hanlderSubmitUpdateAttribute = inject<() => void>(
  "hanlderSubmitUpdateAttribute"
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
        :value="currentAttribute?.k"
        @input="(e) => onChangeInputAttribute(e, 'k')"
      />
      <label
        for="floating_email"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Key
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
          :value="currentAttribute?.v"
          @input="(e) => onChangeInputAttribute(e, 'v')"
        />
        <label
          for="floating_first_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Value</label
        >
      </div>
    </div>
    <VueSpinner
      v-if="updateAttibute.isLoading"
      size="45"
      color="rgb(93, 197, 150)"
    />
    <button
      v-else
      @click="hanlderSubmitUpdateAttribute"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Update
    </button>
  </form>
</template>

<style scoped></style>
