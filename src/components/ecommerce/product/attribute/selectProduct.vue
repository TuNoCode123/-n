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
  listProduct: Iproduct[];
}>();
const gender = ref<number>();
const emit = defineEmits(["hanlderOnlickSelectProduct"]);
watch(
  () => gender.value,
  (nV) => {
    emit("hanlderOnlickSelectProduct", nV);
  }
);
</script>

<template>
  <Select class="w-60" v-model="gender">
    <SelectTrigger class="w-[180px] w-full">
      <SelectValue
        placeholder="Select
       Product"
      />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Product</SelectLabel>
        <div>
          <SelectItem
            v-for="(items, index1) in props.listProduct"
            :value="items.id"
            :key="index1"
          >
            {{ items.nameVi }}
          </SelectItem>
        </div>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
