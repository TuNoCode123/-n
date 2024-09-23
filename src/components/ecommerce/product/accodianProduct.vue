<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SegmentProduct from "./segmentProduct.vue";
import { useCreateProduct } from "@/pinia/productStore";
import Button from "@/components/ui/button/Button.vue";
import { ref, watch } from "vue";

const defaultValue = "item-1";
const useProduct = useCreateProduct();
const isOpen = ref(false);

function clickAccodian() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <Accordion
    type="single"
    class="w-full h-full"
    collapsible
    :default-value="defaultValue"
  >
    <AccordionItem key="product" value="product">
      <AccordionTrigger>
        <Button @click="clickAccodian" v-if="isOpen == false"
          >Click to Create Product</Button
        >
        <Button @click="clickAccodian" v-else>Click to close Accodian</Button>
      </AccordionTrigger>
      <VueSpinner
        v-if="useProduct.isLoading"
        size="45"
        color="rgb(93, 197, 150)"
      />
      <AccordionContent>
        <SegmentProduct />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
