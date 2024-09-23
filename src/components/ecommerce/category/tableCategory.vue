<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { ref } from "vue";
import Dialogverify from "@/components/shareComponent/dialogverify.vue";

import PaginationCate from "./paginationCate.vue";
import { Icategory } from "@/interface/user";
import DialogCategory from "./dialogCategory.vue";

const chooseId = ref<number>();
const isOpen = ref<boolean>(false);
function hanlerOnclickDelete(id: any) {
  isOpen.value = !isOpen.value;
  chooseId.value = id;
}
const closeDialog = () => {
  isOpen.value = false;
};

const props = defineProps<{
  data: Icategory[];
}>();
const emit = defineEmits(["click-button"]);
</script>

<template>
  <Table class="bg-slate-950 text-gray-50 p-3">
    <TableHeader>
      <TableRow>
        <TableHead class="text-slate-200s">Image</TableHead>
        <TableHead class="w-[100px] text-slate-200s">Id </TableHead>
        <TableHead class="text-slate-200s">NameVi</TableHead>
        <TableHead class="text-slate-200s">NameEn</TableHead>
        <TableHead class="text-slate-200s">ParentId</TableHead>
        <TableHead class="text-right text-slate-200s">Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in props.data" :key="item.id">
        <TableCell class="font-medium">
          <div class="w-12 h-12">
            <img :src="item?.image" />
          </div>
        </TableCell>
        <TableCell>{{ item?.id }}</TableCell>
        <TableCell>{{ item?.nameVi }}</TableCell>
        <TableCell>{{ item?.nameEn }}</TableCell>
        <TableCell>{{ item?.parentId }}</TableCell>
        <TableCell class="text-right">
          <div class="flex gap-2">
            <Button variant="secondary" @click="emit('click-button', item)"
              >Update</Button
            >
            <Button
              @click="() => hanlerOnclickDelete(item.id)"
              variant="destructive"
              >Delete</Button
            >
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <div class="w-fit mx-auto p-3">
    <PaginationCate />
  </div>

  <DialogCategory
    v-model:isOpen="isOpen"
    :closeDialog="closeDialog"
    :id="chooseId"
  />
</template>
