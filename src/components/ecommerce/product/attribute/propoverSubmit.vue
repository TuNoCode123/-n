<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const emit = defineEmits([
  "editImage",
  "editDescription",
  "editAttribute",
  "editProduct",
  "editChildProduct",
]);
</script>

<template>
  <Popover class="bg-slate-950">
    <PopoverTrigger as-child>
      <Button> Edit </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div
        @click="emit('editImage')"
        class="cursor-pointer hover:bg-[#ee] p-2 rounded hover:text-blue-500"
      >
        Edit image
      </div>
      <div
        @click="emit('editDescription')"
        class="cursor-pointer hover:bg-[#ee] p-2 rounded hover:text-blue-500"
      >
        Edit description
      </div>
      <div
        @click="emit('editProduct')"
        class="cursor-pointer hover:bg-[#ee] p-2 rounded hover:text-blue-500"
      >
        Edit Product
      </div>
      <div
        @click="emit('editChildProduct')"
        class="cursor-pointer hover:bg-[#ee] p-2 rounded hover:text-blue-500"
      >
        Edit Child Product
      </div>
      <div
        @click="emit('editAttribute')"
        class="cursor-pointer hover:bg-[#ee] p-2 rounded hover:text-blue-500"
      >
        Edit Attribute
      </div>
      <div
        class="cursor-pointer hover:bg-[#ee] p-2 rounded hover:text-blue-500"
      >
        Edit All
      </div>
    </PopoverContent>
  </Popover>
</template>
