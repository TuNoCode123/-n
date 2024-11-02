<script setup lang="ts">
import { Icounpon } from "@/interface/user";
import { createCoupon } from "@/pinia/couponStore";
import { useUserStore } from "@/pinia/userStore";
import { inject, ref, watch } from "vue";
import { toast } from "vue3-toastify";

const newCoupon = ref<Icounpon>({
  description: "",
  limit: null,
  discount: null,
  dateTo: "",
  type: "discount",
  status: "active",
  condition: null,
});
const coupon = createCoupon();
function parseNumber(num: number): string {
  if (num >= 1000000) {
    return Math.round(num / 1000000) + "tr";
  } else if (num >= 1000) {
    return Math.round(num / 1000) + "k";
  }
  return num.toString();
}
const createCoupons = async () => {
  const newObject = Object.keys(newCoupon.value);
  let i: any = undefined;
  newObject.map((item) => {
    if (newCoupon.value[item] == null) {
      i = item;
      return;
    }
  });
  if (i != undefined) {
    toast.error(`missing ${i} input`);
    return;
  }
  if (newCoupon.value.discount < 5000) {
    toast.error("giảm giá thì phải >=5000");
    return;
  }
  if (newCoupon.value.type == "C1") {
    newCoupon.value.description = `Giảm ${parseNumber(
      newCoupon.value.discount
    )} phí vận chuyển`;
  } else {
    newCoupon.value.description = `Giảm ${parseNumber(
      newCoupon.value.discount
    )}`;
  }
  const currentDate = new Date(); // Lấy đối tượng Date hiện tại
  const hours = currentDate.getHours(); // Lấy giờ hiện tại
  const minutes = currentDate.getMinutes(); // Lấy phút hiện tại
  const seconds = currentDate.getSeconds(); // Lấy giây hiện tại
  const dateWithCurrentTime = `T${hours}:${minutes}:${seconds}`;
  await coupon.createCouponWithData(newCoupon.value, dateWithCurrentTime);
};
watch(
  () => coupon.EC,
  (n) => {
    if (n == 0) {
      toast.success(coupon.EM);
      newCoupon.value = {
        description: "",
        limit: null,
        discount: null,
        dateTo: "",
        type: "discount",
        status: "active",
        condition: null,
      };
      coupon.$reset();
    } else if (n == 1) {
      toast.error(coupon.EM);
      coupon.$reset();
    }
  }
);
const store = useUserStore();
watch(
  () => store.code,
  (n) => {
    if (!n) return;
    newCoupon.value.type = n[0].keyMap;
  },
  {
    deep: true,
  }
);
watch(
  () => store.type,
  (n) => {
    if (!n) return;
    newCoupon.value.status = n[0].keyMap;
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 class="text-xl font-semibold mb-4">Create Coupon</h2>
    <form @submit.prevent="createCoupons" class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="limit">
          Limit
        </label>
        <input
          v-model.number="newCoupon.limit"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="limit"
          type="number"
          placeholder="Usage limit"
        />
      </div>
      <div>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="discount"
        >
          Discount
        </label>
        <input
          v-model.number="newCoupon.discount"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="discount"
          type="number"
          placeholder="Discount amount"
        />
      </div>

      <div>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="conditon"
        >
          conditon
        </label>
        <input
          v-model.number="newCoupon.condition"
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
          v-model="newCoupon.type"
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
        <input
          v-model="newCoupon.dateTo"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dateTo"
          type="date"
        />
      </div>
      <div v-if="!coupon.LOADING" class="col-span-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Coupon
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
