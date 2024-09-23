<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  deleteAttributeOfProduct,
  getAttributeOfProduct,
} from "@/pinia/productStore";
import { watch } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps<{
  closeDialog: () => void;
  id: number | undefined;
  productId: number;
}>();

const isOpen = defineModel<boolean>("isOpen");

const deleteAttributes = deleteAttributeOfProduct();
async function handlerClickDeleteProduct(id: number) {
  await deleteAttributes.deleteAttribute(id, props.productId);
}
const productAttribute = getAttributeOfProduct();

watch(
  () => deleteAttributes.isEc,
  (n) => {
    if (n == 0) {
      setTimeout(async () => {
        await productAttribute.getAttribute(props.productId);
        deleteAttributes.reset();
        toast.success(deleteAttributes.isEM);
      }, 300);
    } else if (n == 1) {
      toast.error(deleteAttributes.isEM);
      deleteAttributes.reset();
    }
  }
);
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete </DialogTitle>
        <DialogDescription>
          Bạn có muốn xóa Attribute có Id={{ props.id }} không?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="sm:justify-start">
        <DialogClose>
          <Button
            class="mr-2"
            type="button"
            variant="secondary"
            @click="closeDialog"
          >
            Close
          </Button>
          <Button
            type="button"
            @click="() => handlerClickDeleteProduct(props.id)"
          >
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
