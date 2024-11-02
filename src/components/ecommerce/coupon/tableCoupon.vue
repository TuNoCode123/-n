<script setup lang="ts">
import { Icounpon } from "@/interface/user";
import { onMounted, provide, ref } from "vue";
import { format } from "date-fns";
import { getAllCoupon } from "@/pinia/couponStore";
import ModalDelete from "./modalDelete.vue";
import ModalUpdate from "./modalUpdate.vue";
const coupons = ref<Icounpon[]>([]);
const formatDate = (date: any) => {
  return format(new Date(date), "dd/MM/yyyy");
};
const getCoupon = getAllCoupon();
onMounted(async () => {
  await getCoupon.getAllCoupons();
});

const isOpen = ref(false);
const isOpenModalUpdate = ref(false);
const currentId = ref();
const currentCoupon = ref<Icounpon>();
function delCoupon(id: number) {
  currentId.value = id;
  isOpen.value = true;
}
function updateCoupon(item: Icounpon) {
  isOpenModalUpdate.value = true;
  currentCoupon.value = item;
}
provide("currentCoupon", currentCoupon);
</script>

<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
    <h2 class="text-xl font-semibold mb-4">All Coupons</h2>
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            id
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Description
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Limit
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Discount
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Date To
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Type
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            update
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in getCoupon.listCoupon" :key="coupon.id">
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {{ coupon.id }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {{ coupon.description }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {{ coupon.limit }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {{ coupon.discount }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {{ formatDate(coupon.dateTo) }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {{ coupon.code_type?.valueVi }}
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              :class="
                coupon.code_status?.keyMap === 'S1'
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
              {{ coupon.code_status?.valueVi }}
            </span>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <button
              @click.prevent="() => updateCoupon(coupon)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Update
            </button>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <button
              @click.prevent="() => delCoupon(coupon.id)"
              class="bg-orange-600 hover:bg-red-700 text-white font-bold py-2 px-4 border border-orange-700s rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ModalDelete v-model:is-open="isOpen" :id="currentId" />
  <ModalUpdate v-model:isOpenModalUpdate="isOpenModalUpdate" />
</template>

<style scoped></style>
