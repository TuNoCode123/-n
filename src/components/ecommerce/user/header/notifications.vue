<script setup lang="ts">
import {
  computed,
  ComputedRef,
  inject,
  Ref,
  ref,
  toRaw,
  watchEffect,
} from "vue";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BellIcon, XIcon } from "lucide-vue-next";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { useChatStore } from "@/pinia/chatStore";
import { Inotification, Iuser } from "@/interface/user";
import _ from "lodash";
import { useRoute, useRouter } from "vue-router";

type GroupChat = {
  image: any;
  name: string;
  senderId: number;
  text: string;
  date: string;
};
const isOpen = defineModel("isOpen");

const chat = useChatStore();
const route = useRoute();
const currentUrl = computed(() => route.fullPath);

const getPartner = (senderId: number, listPartner?: Iuser[]) => {
  if (listPartner) return listPartner.find((item) => item.id == senderId);
};
const notifications = inject<Ref<Inotification[]>>("notifications");
const devideGroupChat: ComputedRef<_.Dictionary<GroupChat[]>> = computed(() => {
  if (notifications && notifications.value.length > 0) {
    const convertArr = notifications.value.map((item) => {
      const result = getPartner(item.senderId, chat.listPartner);
      return {
        ...item,
        image: result?.image,
        name: result?.firstName + " " + result?.lastName,
      };
    });
    return _.groupBy(convertArr, "senderId");
  }

  return {};
});

const toggleNotifications = () => {
  isOpen.value = !isOpen.value;
};

const formatTime = (date: Date): string => {
  return format(date, "HH:mm, dd MMM yyyy", { locale: vi });
};
const currentUser = inject<Ref<Iuser>>("currentUser");
const router = useRouter();
const hanlderOnlickNot = (not: GroupChat) => {
  currentUser.value = {
    id: not.senderId,
    image: not.image,
    firstName: not.name.split(" ")[0],
    lastName: not.name.split(" ")[1],
  };
  notifications.value = notifications?.value.filter(
    (item) => item.senderId != not.senderId
  );
  if (currentUrl.value != "/message") {
    router.push("/message");
  }
};
</script>

<template>
  <div>
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="w-96 bg-white rounded-lg shadow-2xl overflow-hidden"
      >
        <div
          class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6"
        >
          <h2 class="text-xl font-semibold">Thông báo</h2>
        </div>
        <perfect-scrollbar
          v-if="Object.keys(devideGroupChat).length > 0"
          class="max-h-96"
        >
          <ul class="divide-y divide-gray-200">
            <li
              v-for="(message, key, index) in devideGroupChat"
              :key="index"
              @click.prevent="hanlderOnlickNot(message[message.length - 1])"
              class="p-4 hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
            >
              <div class="flex items-start space-x-3">
                <img
                  :src="message[message.length - 1].image"
                  alt="image"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">
                    {{ message[message.length - 1].name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    {{ message[message.length - 1].text }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    {{ formatTime(message[message.length - 1].date) }}
                  </p>
                </div>

                <div
                  class="w-6 h-6 bg-blue-500 p-2 flex justify-center items-center text-sm text-white rounded-full"
                >
                  {{ message.length }}
                </div>
              </div>
            </li>
          </ul>
        </perfect-scrollbar>
        <div class="p-4" v-else>Không có thông báo nào!!!</div>
        <div
          class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center"
        >
          <button
            @click="isOpen = false"
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
          >
            Đóng
          </button>
          <button
            class="text-sm font-medium text-gray-600 hover:text-gray-500 transition duration-150 ease-in-out"
          >
            Xem tất cả
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
