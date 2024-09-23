import { computed } from "vue";

import { useUserStore } from "@/pinia/userStore";
import { useCategoryStore } from "@/pinia/categoryStore";
const store = useUserStore();
const categoryStore = useCategoryStore();
export function getFirstKeyMap(storeField: keyof typeof store) {
  return computed(() =>
    store &&
    store[storeField] &&
    Array.isArray(store[storeField]) &&
    store[storeField].length > 0
      ? store[storeField][0].keyMap
      : ""
  );
}
export function getFirstKeyMapCategory(
  storeField: keyof typeof categoryStore.listCategory.data
) {
  return computed(() =>
    categoryStore.listCategory.data &&
    categoryStore.listCategory.data[storeField] &&
    Array.isArray(categoryStore.listCategory.data[storeField]) &&
    categoryStore.listCategory.data[storeField].length > 0
      ? categoryStore.listCategory.data[storeField][0].keyMap
      : ""
  );
}
