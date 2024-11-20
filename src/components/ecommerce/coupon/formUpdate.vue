<script setup lang="ts">
import { Iattribute, Icounpon } from "@/interface/user";
import { createCoupon, updateCoupon } from "@/pinia/couponStore";
import { updateAttributeOfProduct } from "@/pinia/productStore";
import { useUserStore } from "@/pinia/userStore";
import { parseNumber } from "@/util/formatMoney";
import { format, parse, parseISO } from "date-fns";
import _ from "lodash";
import { computed, inject, ref, Ref, watch, watchEffect } from "vue";
import datepicker from "vue3-datepicker";
import { toast } from "vue3-toastify";
const currentAttribute = inject<Iattribute>("currentAttribute");
const updateAttibute = updateAttributeOfProduct();

const currentCoupon = inject<Ref<Icounpon>>("currentCoupon");
const isOpen = defineModel<boolean>("isOpen");
const coupon = createCoupon();
const store = useUserStore();

const formattedDateTo = computed({
  get() {
    if (!currentCoupon || !currentCoupon.value || !currentCoupon.value.dateTo)
      return "";

    const date = new Date(currentCoupon.value.dateTo);
    return date;
  },
  set(value) {
    if (!currentCoupon) return;
    currentCoupon.value.dateTo = value;
  },
});
const useCoupon = updateCoupon();
async function hanldeUpdate() {
  if (!currentCoupon || !currentCoupon.value) return;

  const newObject = _.cloneDeep(currentCoupon.value);
  await useCoupon.updateCouponWithData({
    ...newObject,
    description: `Giảm ${parseNumber(newObject.discount)}`,
  });
}
watch(
  () => useCoupon.EC,
  (n) => {
    if (n == 0) {
      toast.success(useCoupon.EM);
      isOpen.value = !isOpen.value;
      useCoupon.$reset();
    } else if (n == 1) {
      toast.error(useCoupon.EM);
      useCoupon.$reset();
    }
  }
);
</script>

<template>
  <form
    @submit.prevent="hanldeUpdate"
    v-if="currentCoupon"
    class="grid grid-cols-2 gap-4"
  >
    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="limit">
        Limit
      </label>
      <input
        v-model.number="currentCoupon.limit"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="limit"
        type="number"
        placeholder="Usage limit"
      />
    </div>
    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="discount">
        Discount
      </label>
      <input
        v-model.number="currentCoupon.discount"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="discount"
        type="number"
        placeholder="Discount amount"
      />
    </div>

    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="conditon">
        conditon
      </label>
      <input
        v-model.number="currentCoupon.condition"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="conditon"
        type="number"
        placeholder="Discount amount"
      />
    </div>

    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="type">
        Type
      </label>
      <select
        v-model="currentCoupon.type"
        placeholder="chose Type"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="type"
      >
        <option v-for="(item, index) in store.code" :value="item.keyMap">
          {{ item.valueVi }}
        </option>
      </select>
    </div>

    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="dateTo">
        Date To
      </label>
      <datepicker
        v-model="formattedDateTo"
        inputFormat="dd-MM-yyyy"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div v-if="!coupon.LOADING" class="col-span-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Update Coupon
      </button>
    </div>
  </form>
</template>

<style scoped></style>
