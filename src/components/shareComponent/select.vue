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
import { Icategory } from "@/interface/user";

const props = defineProps<{
  listItem: IallCode[];
  type: String;
  defautvalue: any;
  listItemCategory: Icategory[] | undefined;
}>();
const gender = defineModel("gender");
</script>

<template>
  <Select class="w-60" v-model="gender" :default-value="props.defautvalue">
    <SelectTrigger class="w-[180px] w-full">
      <SelectValue v-if="type == 'gender'" placeholder="Select Gender" />
      <SelectValue v-if="type == 'role'" placeholder="Select Role" />
      <SelectValue
        v-if="type == 'category'"
        placeholder="Select
      Parent Category"
      />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel v-if="type == 'gender'">Gender</SelectLabel>
        <SelectLabel v-if="type == 'role'">Role</SelectLabel>
        <SelectLabel v-if="type == 'category'">Category</SelectLabel>
        <SelectItem
          v-if="type != 'category'"
          v-for="(items, index) in props.listItem"
          :value="items.keyMap"
          :key="index"
        >
          {{ items.valueVi }}
        </SelectItem>
        <div v-if="props.listItemCategory">
          <SelectItem
            v-for="(items, index1) in props.listItemCategory"
            :value="items.id"
            :key="index1"
          >
            {{ items.nameVi }}
          </SelectItem>
        </div>
        <div v-else>none</div>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
