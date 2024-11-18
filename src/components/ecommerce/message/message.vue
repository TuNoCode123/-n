<script setup lang="ts">
import {
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  Ref,
  ref,
  watch,
  watchEffect,
} from "vue";
import ContentMessage from "./contentMessage.vue";
import ListUser from "./listUser.vue";
import { Imess, Inotification, Iuser, IuserOnline } from "@/interface/user";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../../../../typeSocket";

import { useChatStore } from "@/pinia/chatStore";

import { toast } from "vue3-toastify";
import Guest from "./guest.vue";

const currentUser = inject<Ref<Iuser>>("currentUser");

const chat = useChatStore();

const socket =
  inject<Ref<Socket<ServerToClientEvents, ClientToServerEvents>>>("socket");

provide("currentUser", currentUser);

watch(
  () => [socket?.value, chat.isEcAddMessages],
  ([socketInstance, n]) => {
    if (!socketInstance) return;
    if (socketInstance instanceof Socket) {
      if (n == 0) {
        socketInstance.emit("sentMess", {
          receiverId: currentUser.value?.id,
          mess: {
            senderId: chat.newMessages ? chat.newMessages?.senderId : null,
            text: chat.newMessages ? chat.newMessages?.text : null,
            createdAt: chat.newMessages?.createdAt,
            roomId: chat.newMessages?.roomId,
            image: chat.newMessages?.image,
            _id: chat.newMessages?._id,
          },
        });
      }
      if (n == 0 && chat.newMessages?.image) {
        chat.addNewMess({
          roomId: chat.newMessages.roomId,
          image: chat.newMessages?.image,
          senderId: chat.newMessages?.senderId,
          createdAt: chat.newMessages?.createdAt,
          _id: chat.newMessages?._id,
        });
        chat.resetiIsNewChat();
        return;
      } else {
        chat.resetiIsNewChat();
      }
      if (n == 1) {
        toast.error("error add image ");
        chat.resetiIsNewChat();
        return;
      }
    }
  }
);
watch(
  () => socket?.value,
  (socketInstance) => {
    if (!socketInstance) return;
    socketInstance.on("updateNewMess", (data) => {
      console.log("update", data);
    });
  }
);
const isCollapsed = ref(false);
provide("isCollapsed", isCollapsed);
const isOpenGuest = ref(false);
</script>

<template>
  <div class="messge max-w-max w-full bg-white flex">
    <div>
      <ListUser v-model:is-open="isOpenGuest" />
    </div>
    <div :class="['content', { active: isCollapsed }]">
      <ContentMessage />
    </div>
  </div>
  <div v-if="isOpenGuest"><Guest v-model:is-open="isOpenGuest" /></div>
</template>

<style scoped>
.content {
  width: 600px;
}
.content.active {
  width: 900px;
}
</style>
