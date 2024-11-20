<script setup lang="ts">
import { RouterView } from "vue-router";

import Bar from "./bar/Bar.vue";
import Menu from "./ecommerce/user/header/Menu.vue";
import { onBeforeUnmount, onMounted, provide, ref, watch } from "vue";
import { useUserStore } from "@/pinia/userStore";
import { useCategoryStore } from "@/pinia/categoryStore";
const categoryStore = useCategoryStore();
import { useScroll } from "@vueuse/core";
import { findExistedShop, useCreateProduct } from "@/pinia/productStore";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../../typeSocket";
import { io, Socket } from "socket.io-client";
import { useAccountStore } from "@/pinia/accountStore";
import { Inotification, Iuser, IuserOnline } from "@/interface/user";
import { useChatStore } from "@/pinia/chatStore";
import { formatSchedual } from "@/util/formatSchedual";
const store = useUserStore();
const useProduct = useCreateProduct();
const shop = findExistedShop();
const userOnlines = ref<IuserOnline[]>([]);
const currentUser = ref<Iuser>();
onMounted(async () => {
  await Promise.all([
    store.getAllUser(0, 5),
    categoryStore.getAllCategoryNoPaginate(),
    categoryStore.getAllCategory(),
    // useProduct.getAllProduct(undefined, undefined, shop.shop?.id),
    store.getType("gender"),
    store.getRoleId("role"),
    store.getCode("CODE"),
    store.getStatus("STATUS"),
  ]);
});
const socket = ref<Socket<ServerToClientEvents, ClientToServerEvents>>();

onMounted(() => {
  const socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:5000"
  );

  socketInstance.on("connect", () => {
    console.log("Socket connected: ", socketInstance.id);
  });

  socketInstance.on("connect_error", (error) => {
    console.error("Socket connection error: ", error);
  });
  socket.value = socketInstance;

  // Cleanup khi component bị unmount
  onBeforeUnmount(() => {
    socketInstance.disconnect();
  });
});
const user = useAccountStore();
const chat = useChatStore();
watch(
  () => [user.inforUser?.id, socket.value],
  ([userId, socketInstance]) => {
    if (!socketInstance) return;

    socketInstance.emit("online", userId);
  },
  {
    immediate: true,
  }
);

watch(
  () => [socket.value],
  ([socketInstance]) => {
    if (!socketInstance) return;
    if (socketInstance instanceof Socket) {
      const handleTotalUserOnline = (userOnline: any) => {
        userOnlines.value = userOnline;
      };
      const handleReceiverMess = (mess: any) => {
        console.log("reciver");
        if (
          mess.roomId == chat.roomId &&
          mess.senderId == currentUser.value?.id
        ) {
          chat.addNewMess({
            ...mess,
            createdAt: formatSchedual(mess.createdAt),
          });
        }
      };
      const getNotification = (not: any) => {
        if (currentUser?.value?.id != not.senderId) {
          notifications.value.push(not);
          // chat.addNotification(notifications.value);
        }
      };
      const hanlderUpdate = (data: any) => {
        chat.updateMess(data);
      };
      const hanlderDelete = (data: any) => {
        console.log("delete", data);
        chat.deleteMess(data);
      };
      socketInstance.on("updateNewMess", hanlderUpdate);
      socketInstance.on("deletePresentMess", hanlderDelete);

      socketInstance.on("notification", getNotification);

      socketInstance.on("receiverMess", handleReceiverMess);
      socketInstance.on("totalUserOnline", handleTotalUserOnline);
      return () => {
        socketInstance.off("totalUserOnline", handleTotalUserOnline);
        socketInstance.off("receiverMess", handleReceiverMess);
        socketInstance.off("notification", getNotification);
        socketInstance.off("updateNewMess", hanlderUpdate);
        socketInstance.off("deletePresentMess", hanlderDelete);
      };
    }
  }
);
const notifications = ref<Inotification[]>([]);

provide("socket", socket);
provide("userOnlines", userOnlines);
provide("currentUser", currentUser);
provide("notifications", notifications);
const el = ref<HTMLElement | null>(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
</script>

<template>
  <div class="flex w-full items-start">
    <div class="w-1/5 md:w-1/5 xl:w-1/5 bg-colorBar">
      <Bar />
    </div>
    <div
      class="w-4/5 md:w-4/5 xl:w-4/5 h-dvh overflow-y-scroll bg-colorRight mb-28 var2"
      ref="el"
    >
      <div><Menu /></div>
      <div class="w-11/12 mt-3 shadow-md mx-auto bg-colorMenu p-2 h-fit">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.var2 {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
