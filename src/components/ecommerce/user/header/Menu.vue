<script setup lang="ts">
import DropdownUser from "./DropdownUser.vue";

import { Button } from "@/components/ui/button";

import { inject, ref, Ref } from "vue";
import { Inotification } from "@/interface/user";
import Notifications from "./notifications.vue";
const notifications = inject<Ref<Inotification[]>>("notifications");
const isOpenNotification = ref(false);
</script>

<template>
  <div
    class="w-11/12 mt-3 mx-auto h-16 shadow-md bg-colorMenu flex justify-end items-center p-2"
  >
    <div class="flex items-center gap-3">
      <div class="relative cursor-pointer">
        <Button
          @click="isOpenNotification = !isOpenNotification"
          variant="ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </Button>

        <!-- Thông báo hình tròn -->
        <div
          v-if="notifications?.length"
          class="absolute top-1 right-4 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold"
        >
          {{ notifications.length }}
        </div>

        <!-- Notifications component -->
        <div v-if="isOpenNotification" class="not">
          <Notifications v-model:is-open="isOpenNotification" />
        </div>
      </div>

      <div class="">
        <DropdownUser />
      </div>
    </div>
  </div>
</template>

<style scoped>
.not {
  position: absolute;
  left: -600%;
  top: 25px;
  z-index: 999999999;
}
</style>
