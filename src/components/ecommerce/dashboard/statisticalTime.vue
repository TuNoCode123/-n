<template>
  <div class="bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">
        Khoảng thời gian phân tích
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold mb-2 text-gray-800">
            Khoảng thời gian trước
          </h2>
          <p class="text-sm text-gray-600">
            Từ {{ props.dateRange?.pre?.start }} đến
            {{ props.dateRange?.pre?.end }}
          </p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold mb-2 text-blue-800">
            Khoảng thời gian hiện tại
          </h2>
          <p class="text-sm text-blue-600">
            Từ {{ props.dateRange?.cur?.start }} đến
            {{ props.dateRange?.cur?.end }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ifigue } from "@/interface/user";

const props = defineProps<{
  dateRange: Ifigue;
}>();
</script>
