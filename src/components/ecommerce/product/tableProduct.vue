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

import { computed, ref } from "vue";

import { useCreateProduct } from "@/pinia/productStore";
import PaginationProduct from "./paginationProduct.vue";
import DialogProduct from "./dialogProduct.vue";

const chooseId = ref<number>();
const isOpen = ref<boolean>(false);
function hanlerOnclickDelete(id: any) {
  isOpen.value = !isOpen.value;
  chooseId.value = id;
}
const closeDialog = () => {
  isOpen.value = false;
};

const useProduct = useCreateProduct();
const listProduct = computed(() => useProduct.listProducts);
</script>

<template>
  <Table class="bg-slate-950 text-gray-50 p-3">
    <TableHeader>
      <TableRow>
        <TableHead class="text-slate-200s">Image</TableHead>
        <TableHead class="w-[100px] text-slate-200s">Id </TableHead>
        <TableHead class="text-slate-200s">NameVi</TableHead>
        <TableHead class="text-slate-200s">NameEn</TableHead>
        <TableHead class="text-slate-200s">Price</TableHead>
        <TableHead class="text-slate-200s">Total Ratings</TableHead>
        <TableHead class="text-slate-200s">Total Starts</TableHead>
        <TableHead class="text-right text-slate-200s">Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in listProduct" :key="item.id">
        <TableCell class="font-medium">
          <div class="w-12 h-12">
            <img :src="item?.id" />
          </div>
        </TableCell>
        <TableCell>{{ item?.id }}</TableCell>
        <TableCell>{{ item?.nameVi }}</TableCell>
        <TableCell>{{ item?.nameEn }}</TableCell>
        <TableCell>{{ item?.price }} VND</TableCell>
        <TableCell v-if="item.totalRatings">{{ item?.totalRatings }}</TableCell>
        <TableCell v-else>0</TableCell>
        <TableCell v-if="item.totalStarts">{{ item?.totalStarts }}</TableCell>
        <TableCell v-else>0</TableCell>

        <TableCell class="text-right">
          <div class="flex gap-2">
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
    <PaginationProduct />
  </div>

  <DialogProduct
    v-model:isOpen="isOpen"
    :closeDialog="closeDialog"
    :id="chooseId"
  />
</template>
