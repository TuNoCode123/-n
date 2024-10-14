<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Cart from "../../SvgComponent/cart.vue";
import User from "../../SvgComponent/user.vue";
import { RouterLink } from "vue-router";
import { useAccountStore } from "@/pinia/accountStore";
import { reactive, watch } from "vue";

const accountStore = useAccountStore();

watch(
  () => accountStore.inforUser,
  (n, o) => {
    if (n?.roleId != "R1") {
      accordionItems[0].child.shift();
    }
  },
  {
    deep: true,
  }
);
const defaultValue = "item-1";

const accordionItems = reactive([
  {
    value: "item-1",
    title: "eCommerce",
    component: Cart,
    child: [
      {
        value: "item-5",
        title: "Admin",
        content: "Yes. It adheres to the WAI-ARIA design pattern.",
        child: [
          {
            value: "item-91",
            title: "Users",
            content: "Yes. It adheres to the WAI-ARIA design pattern.",
            url: "/shop",
          },
        ],
      },
      {
        value: "item-6",
        title: "Products",
        child: [
          {
            value: "item-9",
            title: "Dashboard",
            content: "Yes. It adheres to the WAI-ARIA design pattern.",
            url: "/product",
          },
          {
            value: "item-10",
            title: "Attribute",
            content: "Yes. It adheres to the WAI-ARIA design pattern.",
            url: "/attribute",
          },
        ],
      },
      {
        value: "item-7",
        title: "Categories",
        content: "Yes. It adheres to the WAI-ARIA design pattern.",
        url: "/category",
      },
    ],
  },
  {
    value: "item-2",
    title: "Users",
    component: User,
    child: [
      {
        value: "item-3",
        title: "Is it accessible5?",
        content: "Yes. It adheres to the WAI-ARIA design pattern.",
        url: "/check",
      },
    ],
  },
]);
</script>

<template>
  <Accordion
    type="single"
    class="w-full p-2 border-none"
    collapsible
    :default-value="defaultValue"
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
    >
      <AccordionTrigger class="hover:bg-colorHoverItemBar rounded-lg p-2">
        <div class="flex items-center gap-2">
          <div>
            <component :is="item.component" />
          </div>

          <span class="text-base"> {{ item.title }}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Accordion type="single" collapsible class="ml-2">
          <AccordionItem
            v-for="itemChild in item.child"
            :key="itemChild.value"
            :value="itemChild.value"
          >
            <AccordionTrigger
              v-if="itemChild.child"
              class="hover:bg-colorHoverItemBar rounded-lg p-2"
            >
              <div class="flex items-center gap-2">
                <span class="text-base"> {{ itemChild.title }}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent v-if="itemChild.child">
              <Accordion type="single" collapsible class="ml-2">
                <AccordionItem
                  v-for="itemChild1 in itemChild.child"
                  :key="itemChild1.value"
                  :value="itemChild1.value"
                >
                  <RouterLink :to="itemChild1.url">
                    <div
                      class="p-2 hover:bg-colorHoverItemBar rounded-lg cursor-pointer"
                    >
                      {{ itemChild1.title }}
                    </div></RouterLink
                  >
                </AccordionItem>
              </Accordion>
            </AccordionContent>

            <RouterLink v-else :to="itemChild.url">
              <div
                class="p-2 hover:bg-colorHoverItemBar rounded-lg cursor-pointer"
              >
                {{ itemChild.title }}
              </div></RouterLink
            >
          </AccordionItem>
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
<style scoped></style>
