import { computed } from "vue";

import { useUserStore } from "@/pinia/userStore";
const store = useUserStore();
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
