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
import { inject } from "vue";

const props = defineProps<{
  closeDialog: () => void;
  id: number | undefined;
}>();

const isOpen = defineModel<boolean>("isOpen");
// const emit = defineEmits(["closeDialog"]);
const delUser: any = inject("delUser");
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete </DialogTitle>
        <DialogDescription>
          Bạn có muốn xóa người dùng có Id={{ props.id }} không?
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
          <Button type="button" @click="() => delUser(props.id)">
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
