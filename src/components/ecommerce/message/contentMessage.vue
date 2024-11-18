<script setup lang="ts">
import { ref, onMounted, nextTick, inject, Ref, watch } from "vue";

import ChatInput from "./chatInput.vue";
import { useChatStore } from "@/pinia/chatStore";
import { Imess, Iuser, IuserOnline } from "@/interface/user";
import { useAccountStore } from "@/pinia/accountStore";
import { formatSchedual } from "@/util/formatSchedual";
import { toast } from "vue3-toastify";
import { Ellipsis } from "lucide-vue-next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ModalUpdateMessages from "./modalUpdateMessages.vue";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../../../../typeSocket";
import ModalDeleteMessage from "./modalDeleteMessage.vue";
const currentUser = inject<Ref<Iuser>>("currentUser");

const newMessage = ref("");
const messageList = ref(null);
const fileInput = ref(null);
const chat = useChatStore();
const sendMessage = async () => {
  if (newMessage.value.trim() && chat.listMessages && chat.roomId) {
    await chat.addmess(user.inforUser?.id, newMessage.value, chat.roomId);
    chat.listMessages.push({
      senderId: user.inforUser?.id,
      text: newMessage.value,
      roomId: chat.roomId,
      _id: chat.newMessages?._id,
      createdAt: formatSchedual(Date.now()),
    });
    newMessage.value = "";
    scrollToBottom();
  }
};
const user = useAccountStore();
watch(
  () => currentUser?.value?.id,
  async (n) => {
    await chat.getAllMessages(user.inforUser?.id, n);
  }
);

const scrollToBottom = () => {
  nextTick(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight;
    }
  });
};

const openImagePicker = () => {
  fileInput.value.click();
};

const handleImageSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await chat.addmess(user.inforUser?.id, newMessage.value, chat.roomId, file);
  }
};
// watch(
//   () => chat.isEcAddMessages,
//   (n) => {
//     if (n == 0 && chat.newMessages?.image) {
//       chat.addNewMess({
//         roomId: chat.newMessages.roomId,
//         image: chat.newMessages?.image,
//         senderId: chat.newMessages?.senderId,
//         createdAt: chat.newMessages?.createdAt,
//       });
//       chat.resetiIsNewChat();
//     } else if (n == 1) {
//       toast.error("error add image ");
//       chat.resetiIsNewChat();
//     }
//   }
// );
const openEmojiPicker = () => {
  // Implement emoji picker functionality here
  console.log("Emoji picker opened");
};
const userOnlines = inject<Ref<IuserOnline[]>>("userOnlines");
onMounted(async () => {
  await chat.getAllMessages(user.inforUser?.id, currentUser?.value?.id);
  scrollToBottom();
});
watch(
  () => chat.listMessages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
const modalUpdate = ref(false);
const modalDelete = ref(false);
const textCurrent = ref<string>();
const mess = ref<Imess>();
const hanlderUpdateMessage = (message: Imess) => {
  console.log(message);
  textCurrent.value = message.text;
  mess.value = message;
  modalUpdate.value = true;
};
const socket =
  inject<Ref<Socket<ServerToClientEvents, ClientToServerEvents>>>("socket");

const updateMessage = async () => {
  const date = formatSchedual(new Date().toISOString());

  chat.listMessages = chat.listMessages?.map((item) => {
    if (item._id == mess.value?._id) {
      return {
        ...item,
        text: textCurrent.value,
        createdAt: date,
      };
    }
    return item;
  });

  socket?.value.emit("updateMess", {
    receiverId: currentUser?.value.id,
    mess: {
      createdAt: date,
      text: textCurrent.value,
      _id: mess.value?._id,
    },
  });
  await chat.updateMessages(
    mess.value?.senderId,
    textCurrent.value,
    mess.value?.roomId,
    mess.value?._id
  );
};
const isPopoverOpen = ref(true);
const closePopover = () => {
  isPopoverOpen.value = false;
};
const openPopover = () => {
  isPopoverOpen.value = true;
};
const deleteMessage = (item: Imess) => {
  mess.value = item;
  modalDelete.value = true;
  closePopover();
};

const hanlderDeleteMessage = async () => {
  chat.listMessages = chat.listMessages?.map((item) => {
    if (item._id == mess.value?._id) {
      return {
        ...item,
        text: "tin nhắn đã bị thu hồi",
        image: null,
        type: "delete",
      };
    }
    return item;
  });
  const date = formatSchedual(new Date().toISOString());
  socket?.value.emit("deleteMess", {
    receiverId: currentUser?.value.id,
    mess: {
      createdAt: date,
      text: "Tin nhắn này đã bị xóa!!",
      _id: mess.value?._id,
      type: "delete",
    },
  });
  await chat.updateMessages(
    mess.value?.senderId,
    textCurrent.value,
    mess.value?.roomId,
    mess.value?._id,
    "delete"
  );
  // modalDelete.value = true;
};

// watch(
//   () => chat.isEcUpdateMessage,
//   (n) => {
//     if (n == 0) {
//       socket?.value.emit("updateMess", {
//         receiverId: currentUser?.value.id,
//         mess: {
//           createdAt: date,
//           text: textCurrent.value,
//           _id: mess.value?._id,
//         },
//       });
//       chat.resetiIsNewChat();
//     } else if (n == 1) {
//       if (chat.isEmUpdateMessage) toast.error(chat.isEmUpdateMessage);
//       chat.resetiIsNewChat();
//     }
//   }
// );
</script>

<template>
  <div
    v-if="currentUser"
    class="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full"
  >
    <!-- Header -->
    <header class="bg-white shadow-md p-4 flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img
          :src="currentUser?.image"
          alt="User Avatar"
          class="w-10 h-10 rounded-full"
        />
      </div>
      <div>
        <h1 class="text-xl font-semibold text-gray-800">
          {{ currentUser.firstName + " " + currentUser.lastName }}
        </h1>
        <p
          v-if="
            userOnlines &&
            userOnlines.length > 0 &&
            userOnlines.some((u) => u.userId == currentUser?.id)
          "
          class="text-sm text-green-500"
        >
          Online
        </p>
        <p v-else class="text-sm text-lime-800">Offline</p>
      </div>
    </header>

    <!-- Message List -->
    <div
      ref="messageList"
      class="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
    >
      <transition-group name="message">
        <div
          class="flex"
          v-if="chat.listMessages && chat.listMessages.length > 0"
          v-for="(message, index) in chat.listMessages"
        >
          <div
            :key="index"
            :class="[
              'rounded-lg p-3 mb-2 shadow-sm relative',
              message.senderId == user.inforUser?.id
                ? `ml-auto  bg-blue-500 text-white`
                : 'bg-white text-gray-800',
            ]"
          >
            <Popover v-if="isPopoverOpen">
              <PopoverTrigger asChild>
                <div class="icon-option"><Ellipsis color="gray" /></div
              ></PopoverTrigger>
              <PopoverContent>
                <div class="flex gap-5">
                  <strong
                    v-if="message.text"
                    @click="hanlderUpdateMessage(message)"
                    class="text-blue-600 underline cursor-pointer flex justify-start"
                    >Chỉnh sửa</strong
                  >
                  <strong
                    @click="deleteMessage(message)"
                    class="text-orange-600 underline cursor-pointer flex justify-start"
                    >Thu hồi</strong
                  >
                </div>
              </PopoverContent>
            </Popover>

            <div v-if="message.type" class="break-words flex text-orange-300">
              {{ message.text }}
            </div>
            <div v-else class="break-words word-break break-all flex max-w-sm">
              {{ message.text }}
            </div>
            <img
              v-if="message.image"
              :src="message.image"
              alt="Sent image"
              class="mt-2 rounded-lg w-60 h-60 object-contain"
            />

            <p class="text-xs mt-1 opacity-70">{{ message.createdAt }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Input Area -->

    <div
      v-if="!chat.isLoadingAddMess"
      class="bg-white border-t border-gray-200"
    >
      <div class="flex items-center space-x-2">
        <div class="relative flex-1">
          <!-- <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type a message..."
            class="w-full py-3 px-12 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          /> -->
          <ChatInput
            v-model:newMessage="newMessage"
            @sendMessage="sendMessage"
            @handleImageSelect="handleImageSelect"
          />
        </div>
      </div>
    </div>

    <!-- Hidden file input for image selection -->
    <input
      type="file"
      ref="fileInput"
      @change="handleImageSelect"
      accept="image/*"
      class="hidden"
    />
    <ModalDeleteMessage
      v-model:is-open="modalDelete"
      @delete:message="hanlderDeleteMessage"
      :openPopover="openPopover"
    />
    <ModalUpdateMessages
      v-model:is-open="modalUpdate"
      v-model:textCurrent="textCurrent"
      @update:message="updateMessage"
    />
  </div>

  <div v-else>Don't any chat</div>
</template>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.content[data-v-c5ec3571] {
  width: calc(100% - 320px);
}
.scroll-smooth {
  scroll-behavior: smooth;
}
@keyframes blurry-fade-in {
  0% {
    filter: blur(20px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

.animate-blurry-fade-in {
  animation: blurry-fade-in 1s ease-out;
}
.icon-option {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
}
</style>
