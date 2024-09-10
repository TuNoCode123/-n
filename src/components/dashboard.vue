<script setup lang="ts">
import { RouterView } from "vue-router";
import Bar from "./bar/Bar.vue";
import Menu from "./header/Menu.vue";
</script>

<template>
  <div class="flex w-full items-start">
    <div class="w-1/5 md:w-3/5 xl:w-1/5 bg-colorBar">
      <Bar />
    </div>
    <div class="w-4/5 md:w-2/5 xl:w-4/5 bg-colorRights mb-7">
      <div><Menu /></div>
      <div class="w-11/12 mt-3 shadow-md mx-auto bg-colorMenu">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
