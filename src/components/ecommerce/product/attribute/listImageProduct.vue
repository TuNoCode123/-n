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

import { computed, inject, ref } from "vue";
import { Iattribute } from "@/interface/user";
import {
  deleteImageOfProduct,
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

        <TableHead class="text-slate-200s">Image</TableHead>
        <TableHead class="text-slate-200s">publicId</TableHead>
        <TableHead class="text-slate-200s">Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(item, index) in imageProductStore.listImageProduct"
        :key="index"
      >
        <TableCell>{{ item?.id }}</TableCell>

        <TableCell>
          <img :src="item?.image" height="10" />
        </TableCell>
        <TableCell>{{ item?.publicId }}</TableCell>

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
    :productId="imageProductStore?.listImageProduct[0]?.productId"
  />
</template>
