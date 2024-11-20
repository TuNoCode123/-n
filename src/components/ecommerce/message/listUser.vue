<script setup lang="ts">
import { Inotification, Iuser, IuserOnline } from "@/interface/user";
import { useAccountStore } from "@/pinia/accountStore";
import { useChatStore } from "@/pinia/chatStore";
import { formatSchedual } from "@/util/formatSchedual";
import { ref, computed, onMounted, watchEffect, watch, inject, Ref } from "vue";

const isCollapsed = inject<Ref<boolean>>("isCollapsed");
const searchQuery = ref("");
const isOpen = defineModel<Ref<boolean>>("isOpen");
const filteredUsers = computed(() => {
  return chat.listPartner.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
const currentUser = inject<Ref<Iuser>>("currentUser");
const userOnlines = inject<Ref<IuserOnline[]>>("userOnlines");
const notifications = inject<Ref<Inotification[]>>("notifications");
const user = useAccountStore();
const chat = useChatStore();

const hanlderOnClickRenderChat = (user: Iuser) => {
  if (!currentUser) return;
  currentUser.value = user;
  notifications.value = notifications?.value.filter(
    (i) => i.senderId != user.id
  );
};
const getCurrentNotification = (item: Inotification[], partnerId: number) => {
  const res = item.filter((i) => +i.senderId == partnerId);

  return {
    len: res.length,
    final:
      res.length > 0 && res[res.length - 1]?.text
        ? res[res.length - 1]?.text
        : "Đã gửi ảnh cho bạn!!!",
    finalTime: res.length > 0 && formatSchedual(res[res.length - 1].date),
  };
};
// watchEffect(() => {
//   console.log(notifications?.value);
// });
watch(
  () => user.inforUser?.id,
  async (n) => {
    await chat.getListPartner(n);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div
    :class="[
      'flex h-screen bg-gradient-to-b from-purple-600 to-indigo-700 text-white transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-80',
    ]"
  >
    <div
      class="flex flex-col flex-grow overflow-hidden backdrop-blur-lg bg-white bg-opacity-10"
    >
      <div class="flex items-center justify-between p-4">
        <h2 v-if="!isCollapsed" class="text-2xl font-bold">Chats</h2>
        <button
          @click="toggleCollapse"
          class="p-2 rounded-full hover:bg-white hover:bg-opacity-10 focus:outline-none"
        >
          <svg
            v-if="isCollapsed"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <div v-if="!isCollapsed" class="px-4 mb-4">
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border-none rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      <div class="flex-grow overflow-y-auto">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          @click="hanlderOnClickRenderChat(user)"
          class="flex items-center p-4 hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer relative"
          :class="{ 'justify-center': isCollapsed }"
        >
          <div class="relative flex-shrink-0">
            <img
              :src="user.image"
              :alt="user.email"
              class="w-12 h-12 rounded-full"
            />

            <span
              v-if="notifications?.some((n) => n.senderId == user.id)"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ getCurrentNotification(notifications, user.id).len }}
            </span>
          </div>
          <template v-if="!isCollapsed">
            <div class="flex-grow min-w-0 ml-4">
              <h3 class="font-semibold truncate">
                {{ user.firstName + " " + user.lastName }}
              </h3>

              <div
                v-if="
                  userOnlines?.length &&
                  userOnlines.some((u) => u.userId === user.id)
                "
                class="flex items-center space-x-2 absolute right-3 top-3"
              >
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p
                v-if="notifications?.some((n) => n.senderId == user.id)"
                class="text-sm text-gray-300 truncate"
              >
                {{ getCurrentNotification(notifications, user.id).final }}
              </p>
            </div>
            <span
              v-if="notifications?.some((n) => n.senderId == user.id)"
              class="text-xs text-slate-100"
              >{{
                getCurrentNotification(notifications, user.id).finalTime
              }}</span
            >
          </template>
        </div>
      </div>

      <div
        :class="[
          'flex items-center p-4 border-t border-white border-opacity-20',
          isCollapsed ? 'justify-center' : 'justify-between',
        ]"
      >
        <button
          @click="isOpen = true"
          class="p-2 rounded-full hover:bg-white hover:bg-opacity-10 focus:outline-none"
          title="New Chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <button
          v-if="!isCollapsed"
          class="p-2 rounded-full hover:bg-white hover:bg-opacity-10 focus:outline-none"
          title="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
