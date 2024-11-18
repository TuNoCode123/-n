<template>
  <div class="p-4 bg-white rounded-lg shadow-sm max-w-xs">
    <h2 class="text-lg font-semibold text-gray-800 mb-3">Order Status</h2>
    <ul class="space-y-2">
      <li
        v-for="(value, key) in props.orderData"
        :key="key"
        class="flex items-center justify-between"
      >
        <div class="flex items-center">
          <component
            :is="icons[key]"
            :class="['h-4 w-4 mr-2', iconColors[key]]"
          />
          <span class="text-sm text-gray-600">{{ formatLabel(key) }}</span>
        </div>
        <span class="text-sm font-medium text-gray-800">{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  PauseCircleIcon,
} from "lucide-vue-next";

const props = defineProps<{
  orderData: any;
}>();

const icons = {
  processingOrder: ClockIcon,
  completeOrder: CheckCircleIcon,
  transportOrder: TruckIcon,
  cancelOrder: XCircleIcon,
  pendingOrder: PauseCircleIcon,
};

const iconColors = {
  processingOrder: "text-yellow-500",
  completeOrder: "text-green-500",
  transportOrder: "text-blue-500",
  cancelOrder: "text-red-500",
  pendingOrder: "text-gray-500",
};

const formatLabel = (key: any) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str: any) => str.toUpperCase())
    .replace("Order", "");
};
</script>
