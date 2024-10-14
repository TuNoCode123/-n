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
import type { IallCode } from "../../interface/allcode";
import { ref, watch } from "vue";
import { Icategory } from "@/interface/user";

const props = defineProps<{
  listItemCategory: Icategory[];
  uuid: number;
}>();
const gender = ref<number>();
const emit = defineEmits(["updateProduct"]);
function clickSelect() {
  console.group("click");
}
watch(
  () => gender.value,
  (n, o) => {
    if (props.uuid) {
      emit("updateProduct", null, props.uuid, "categoryId", gender.value);
      return;
    }
    emit("updateProduct", null, "categoryId", gender.value);
  }
);
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
            v-for="(items, index1) in props.listItemCategory"
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
