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
import { getAttributeOfProduct } from "@/pinia/productStore";
import DialogListAttribute from "./dialogListAttribute.vue";

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
const productAttribute = getAttributeOfProduct();
</script>

<template>
  <Table class="bg-slate-950 text-gray-50 p-3">
    <TableHeader>
      <TableRow>
        <TableHead class="text-slate-200s">Id </TableHead>

        <TableHead class="text-slate-200s">Key</TableHead>
        <TableHead class="text-slate-200s">Value</TableHead>
        <TableHead class="text-slate-200s">Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(item, index) in productAttribute.listAttribute"
        :key="index"
      >
        <TableCell>{{ item?.id }}</TableCell>

        <TableCell>{{ item?.k }}</TableCell>
        <TableCell>{{ item?.v }}</TableCell>

        <TableCell class="text-right">
          <div class="flex gap-2">
            <Button variant="secondary" @click="() => hanlderClickUpdate(item)"
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

  <DialogListAttribute
    v-model:isOpen="isOpen"
    :closeDialog="closeDialog"
    :id="chooseId"
    :productId="productAttribute?.listAttribute[0]?.productId"
  />
</template>
