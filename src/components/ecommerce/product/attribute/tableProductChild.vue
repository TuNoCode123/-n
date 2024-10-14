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

import { computed, inject, onMounted, Ref, ref } from "vue";
import { Iattribute } from "@/interface/user";
import {
  deleteImageOfProduct,
  getAllProductChilds,
  getAttributeOfProduct,
  getImageOfProduct,
} from "@/pinia/productStore";
import DialogListAttribute from "./dialogListAttribute.vue";
import DialogImageProduct from "./dialogImageProduct.vue";
import { VueSpinner } from "vue3-spinners";

const chooseId = ref<number>();
const isOpen = ref<boolean>(false);
function hanlerOnclickDelete(id: any) {
  isOpen.value = !isOpen.value;
  chooseId.value = id;
}
const closeDialog = () => {
  isOpen.value = false;
};
const hanlderClickUpdate = inject("hanlderClickUpdate");
const deleteImage = deleteImageOfProduct();
const imageProductStore = getImageOfProduct();
const childStore = getAllProductChilds();
const productId = inject<Ref<number>>("productId");

// onMounted(async () => {
//   await childStore.getChildOfProduct();
// });
</script>

<template>
  <VueSpinner
    v-if="deleteImage.isLoading"
    size="45"
    color="rgb(93, 197, 150)"
  />
  <Table v-else class="bg-slate-950 text-gray-50 p-3">
    <TableHeader>
      <TableRow>
        <TableHead class="text-slate-200s">Id </TableHead>
        <TableHead class="text-slate-200s">Key</TableHead>
        <TableHead class="text-slate-200s">Value</TableHead>
        <TableHead class="text-slate-200s">quantity</TableHead>
        <TableHead class="text-slate-200s">Image</TableHead>
        <TableHead class="text-slate-200s">Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(item, index) in childStore.listChildsProduct"
        :key="index"
      >
        <TableCell>{{ item?.id }}</TableCell>

        <TableCell>{{ item?.k }}</TableCell>
        <TableCell>{{ item?.v }}</TableCell>
        <TableCell v-if="item?.product_child_inventory?.quantity">{{
          item?.product_child_inventory?.quantity
        }}</TableCell>
        <TableCell v-else>0</TableCell>
        <TableCell v-if="item.image" class="w-20 h-20 object-contain">
          <img :src="item.image" height="10" />
        </TableCell>
        <TableCell v-else>None</TableCell>
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

  <DialogImageProduct
    v-model:isOpen="isOpen"
    :closeDialog="closeDialog"
    :id="chooseId"
    :productId="childStore?.listChildsProduct[0]?.productId"
    type="childProduct"
  />
</template>
