<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Iuser } from "@/interface/user";
import { Button } from "@/components/ui/button";
import Dialogverify from "./dialogverify.vue";
import Pagination from "./pagination.vue";
import { ref } from "vue";
const props = defineProps<{
  data: Iuser[];
}>();
const chooseId = ref<number>();
const isOpen = ref<boolean>(false);
function hanlerOnclickDelete(id: any) {
  isOpen.value = !isOpen.value;
  chooseId.value = id;
}
const closeDialog = () => {
  isOpen.value = false;
};
const emit = defineEmits(["click-button"]);
</script>

<template>
  <Table class="bg-slate-950 text-gray-50 p-3">
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px] text-slate-200s">Id </TableHead>
        <TableHead class="text-slate-200s">Email</TableHead>
        <TableHead class="text-slate-200s">FirstName</TableHead>
        <TableHead class="text-slate-200s">LastName</TableHead>
        <TableHead class="text-slate-200s">Address</TableHead>

        <TableHead class="text-slate-200s">PhoneNumber</TableHead>
        <TableHead class="text-right text-slate-200s">Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in props.data" :key="item.id">
        <TableCell class="font-medium">
          {{ item.id }}
        </TableCell>
        <TableCell>{{ item.email }}</TableCell>
        <TableCell>{{ item.firstName }}</TableCell>
        <TableCell>{{ item.lastName }}</TableCell>
        <TableCell>{{ item.address }}</TableCell>
        <TableCell>{{ item.phoneNumber }}</TableCell>
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
  <div class="w-fit mx-auto p-3"><Pagination /></div>

  <Dialogverify
    v-model:isOpen="isOpen"
    :closeDialog="closeDialog"
    :id="chooseId"
  />
</template>
