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

const props = defineProps<{
  listItem: IallCode[];
  type: String;
}>();

const gender = defineModel("gender");
</script>

<template>
  <Select class="w-60" v-model="gender">
    <SelectTrigger class="w-[180px] w-full">
      <SelectValue placeholder="Select Gender" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel v-if="type == 'gender'">Gender</SelectLabel>
        <SelectLabel v-if="type == 'role'">Role</SelectLabel>

        <SelectItem
          v-for="(items, index) in props.listItem"
          :value="items.keyMap"
          :key="index"
        >
          {{ items.valueVi }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
