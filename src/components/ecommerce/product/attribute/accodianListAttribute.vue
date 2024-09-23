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
import { inject, ref, watch } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import ListAttribute from "./listAttribute.vue";
const defaultValue = "item-1";
const useProduct = useCreateProduct();
const isOpen = ref(false);
const productLIst = inject("productLIst");
function clickAccodian() {
  isOpen.value = !isOpen.value;
}
const text = ref(productLIst?.value?.pro_des?.text);
watch(
  () => productLIst?.value?.pro_des?.text,
  (n) => {
    text.value = n;
  }
);
console.log("---->", text);

function renderHtmlAccodian(htmlText: string) {
  emit("renderHtml", htmlText, text.value);
}

const emit = defineEmits(["renderHtml"]);
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
          >Click to Open List Attribute</Button
        >
        <Button @click="clickAccodian" v-else
          >Click to Close List Attribute</Button
        >
      </AccordionTrigger>
      <AccordionContent>
        <div class="w-full mt-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <ListAttribute />
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
