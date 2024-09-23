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
  deleteImageOfProduct,
  getAttributeOfProduct,
  getImageOfProduct,
} from "@/pinia/productStore";
import { watch } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps<{
  closeDialog: () => void;
  id: number | undefined;
  productId: number;
}>();

const isOpen = defineModel<boolean>("isOpen");

const deleteImage = deleteImageOfProduct();
async function handlerClickDeleteProduct(id: number) {
  await deleteImage.deleteImage(id, props.productId);
}
const productImage = getImageOfProduct();

watch(
  () => deleteImage.isEc,
  (n) => {
    if (n == 0) {
      setTimeout(async () => {
        await productImage.getImage(props.productId);
        deleteImage.reset();
        toast.success(deleteImage.isEM);
      }, 200);
    } else if (n == 1) {
      toast.error(deleteImage.isEM);
      deleteImage.reset();
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
