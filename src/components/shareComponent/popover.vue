<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Iproduct } from "@/interface/user";
const props = defineProps<{
  name: string;
  type: keyof Iproduct;
}>();
const emit = defineEmits(["updateProduct"]);
</script>

<template>
  <Popover class="w-96">
    <PopoverTrigger>
      <p class="text-sky-500 underline">more</p>
    </PopoverTrigger>
    <PopoverContent class="w-full">
      <textarea
        @input="(e) => emit('updateProduct', e, type)"
        :value="props.name"
        class="w-60 h-40 p-3 text-sm"
      />
    </PopoverContent>
  </Popover>
</template>
