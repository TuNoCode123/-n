import type { Ref } from "vue";
export interface Ilocation {
  location: Ref<string>;
  updateLocation: () => void;
}
export interface Iopen {
  isOpen: boolean;
}
