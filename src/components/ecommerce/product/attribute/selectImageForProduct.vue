<script setup lang="ts">
import { computed, inject, ref, toRaw, watch, defineEmits } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import {
  CheckIcon,
  ChevronUpDownIcon,
  CodeBracketSquareIcon,
} from "@heroicons/vue/20/solid";
import { getImageOfProduct } from "@/pinia/productStore";
import { Iattribute, IimageProduct } from "@/interface/user";
import _ from "lodash";
const imageProductStore = getImageOfProduct();
const selectedImage = inject("selectedImage");
const initState = ref(false);
watch(
  () => selectedImage,
  (n) => {
    selected.value = toRaw(n.value);
  },
  {
    deep: true,
  }
);
const props = defineProps<{
  uuid: any;
}>();
const emit = defineEmits(["updateProduct"]);
const selected = ref();

watch(
  () => selected.value,
  (n, o) => {
    emit("updateProduct", null, "image", n.image);
  },
  {
    deep: true,
  }
);
const noneSelect: IimageProduct = {
  publicId: "none",
  image: "none",
  id: 0,
};
const listImage = computed(() => {
  const listImageCopy = _.cloneDeep(imageProductStore.listImageProduct);
  if (listImageCopy && Array.isArray(listImageCopy))
    return [...listImageCopy, noneSelect];
});
</script>

<template>
  <Listbox as="div" v-model="selected">
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
      >
        <span v-if="selected?.image != 'none'" class="flex items-center">
          <img
            :src="selected?.image"
            alt=""
            class="h-5 w-5 flex-shrink-0 rounded-full"
          />
          <span class="ml-3 block truncate">{{ selected?.id }}</span>
        </span>
        <div v-else class="text-center text-slate-400">None</div>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="(image, index) in listImage"
            :key="index"
            :value="image"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <div v-if="image.image != 'none'" class="flex items-center gap-2">
                <img
                  :src="image.image"
                  alt=""
                  class="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span>{{ image.id }}</span>
              </div>
              <div v-else class="text-center text-slate-400">None</div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
