<script setup lang="ts">
import DropdownUser from "./DropdownUser.vue";

import { Button } from "@/components/ui/button";
</script>

<template>
  <div
    class="w-11/12 mt-3 mx-auto h-16 shadow-md bg-colorMenu flex justify-end items-center p-2"
  >
    <div class="flex items-center gap-3">
      <div></div>
      <div class="cursor-pointer">
        <Button variant="ghost">
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
            /></svg
        ></Button>
      </div>
      <div class="">
        <DropdownUser />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
