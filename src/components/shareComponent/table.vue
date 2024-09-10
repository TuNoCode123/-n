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
import { ref } from "vue";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
</script>

<template>
  <Table class="bg-slate-950 text-gray-50">
    <TableCaption>A list of your recent invoices.</TableCaption>
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
            <Button variant="secondary">Update</Button>
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
  <Dialogverify :isOpen="isOpen" :closeDialog="closeDialog" :id="chooseId" />
</template>
