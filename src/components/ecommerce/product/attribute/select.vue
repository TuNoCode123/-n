<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ref, watch } from "vue";
import { Icategory, Iproduct } from "@/interface/user";
import { useCategoryStore } from "@/pinia/categoryStore";

const props = defineProps<{
  listItemCategory: Icategory[];
  uuid: number;
  type: string;
}>();
const gender = ref<Iproduct[]>();
const emit = defineEmits(["getProductOfCategory", "updateProduct"]);
watch(
  () => gender.value,
  (nV) => {
    emit("getProductOfCategory", gender.value);
  }
);

const categoryStore = useCategoryStore();
</script>

<template>
  <Select class="w-60" v-model="gender">
    <SelectTrigger class="w-[180px] w-full">
      <SelectValue
        placeholder="Select
       Category"
      />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Category</SelectLabel>
        <div>
          <SelectItem
            v-for="(items, index1) in categoryStore.listCategoryNoPaginate"
            :value="items.cate_pro"
            :key="index1"
          >
            {{ items.nameVi }}
          </SelectItem>
        </div>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
