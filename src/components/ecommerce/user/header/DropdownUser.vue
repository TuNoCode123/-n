<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccountStore } from "@/pinia/accountStore";
import { onMounted, watch } from "vue";
import { findExistedShop, useCreateProduct } from "@/pinia/productStore";
import { useCategoryStore } from "@/pinia/categoryStore";

const store = useAccountStore();
onMounted(() => {
  store.getAccount();
});
function handlerOnlickBackHome() {
  window.location.href =
    import.meta.env.VITE_BASEURL_APP ?? "http://localhost:5174";
}
const useProduct = useCreateProduct();

const shop = findExistedShop();
watch(
  () => store.inforUser,
  async (n) => {
    await shop.findShop(n?.id);
  },
  {
    deep: true,
  }
);
const categoryStore = useCategoryStore();
watch(
  () => shop.isEc,
  async (n) => {
    if (n == 0) {
      await Promise.all([
        useProduct.getAllProduct(undefined, undefined, shop.shop?.id),
        categoryStore.getAllCategoryNoPaginate(shop.shop?.id),
      ]);
    }
  }
);
watch(
  () => store.err,
  (newValue, oldValue) => {
    if (newValue == "err") {
      window.location.href =
        import.meta.env.VITE_BASEURL_APP ?? "http://localhost:5174";
    }
  }
);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child v-if="store.inforUser">
      <Avatar class="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <div v-else>not login</div>
    <DropdownMenuContent class="w-56 mr-10">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span @click="handlerOnlickBackHome" class="font-bold"> Home</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <span>New Team</span>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
