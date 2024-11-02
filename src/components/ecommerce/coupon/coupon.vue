<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Coupon Management</h1>

    <!-- Coupon Creation Form -->
    <div>
      <Form />
    </div>

    <!-- Coupons Table -->
    <div>
      <TableCoupon />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { format } from "date-fns";
import Form from "./form.vue";
import TableCoupon from "./tableCoupon.vue";

const coupons = ref([]);

const formatDate = (date: any) => {
  return format(new Date(date), "dd/MM/yyyy");
};
</script>
