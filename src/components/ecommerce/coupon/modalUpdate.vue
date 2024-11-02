<script lang="ts" setup>
import { inject, KeepAlive, reactive, ref } from "vue";
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FormUpdate from "./formUpdate.vue";

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate();
const isDesktop = useMediaQuery("(min-width: 768px)");
const isOpen = defineModel<boolean>("isOpenModalUpdate");
</script>

<template>
  <UseTemplate>
    <KeepAlive>
      <FormUpdate v-model:isOpen="isOpen" />
    </KeepAlive>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogContent class="w-1/2">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <KeepAlive>
        <GridForm />
      </KeepAlive>
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>
      <KeepAlive>
        <GridForm />
      </KeepAlive>
      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline"> Cancel </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
