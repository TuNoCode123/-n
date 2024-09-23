<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/pinia/categoryStore";
import { computed, inject } from "vue";

const categoryStore = useCategoryStore();
const limitRows = import.meta.env.VITE_LIMIT_ROWS;
const totalPageCate = computed(
  () => +categoryStore?.countCategory / +limitRows
);

const getCurrentPageCateGory = inject<(value: number) => void>(
  "getCurrentPageCateGory"
);
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :total="Math.ceil(totalPageCate) * 10"
    :sibling-count="1"
    show-edges
    :default-page="1"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
            @click="getCurrentPageCateGory(item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>
    </PaginationList>
  </Pagination>
</template>
