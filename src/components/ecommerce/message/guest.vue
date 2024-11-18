<script setup lang="ts">
import { ref, computed, Ref, watch, onMounted, watchEffect } from "vue";
import { XIcon, StarIcon } from "lucide-vue-next";
import { findExistedShop, getCommentForShop } from "@/pinia/productStore";
import { useChatStore } from "@/pinia/chatStore";
import { toast } from "vue3-toastify";
import { useAccountStore } from "@/pinia/accountStore";

const isOpen = defineModel<Ref<boolean>>("isOpen");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;
const shop = findExistedShop();
const useShop = getCommentForShop();
const closeModal = () => {
  isOpen.value = false;
};

// Sample customer data
const customers = ref([
  {
    id: 1,
    name: "John Doe",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 3,
    name: "Bob Johnson",
    image: "/placeholder.svg?height=100&width=100",
    rating: 3,
  },
  {
    id: 4,
    name: "Alice Brown",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
  {
    id: 5,
    name: "Charlie Davis",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 6,
    name: "Eva Wilson",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
  {
    id: 7,
    name: "Frank Miller",
    image: "/placeholder.svg?height=100&width=100",
    rating: 3,
  },
  {
    id: 8,
    name: "Grace Lee",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 9,
    name: "Henry Taylor",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
  {
    id: 10,
    name: "Ivy Chen",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]);
const chat = useChatStore();
const filteredCustomers = computed(() => {
  return useShop.shopComment?.filter(
    (customer) =>
      !chat.listPartner?.some((partner) => partner.id === customer.userId)
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredCustomers?.value?.length / itemsPerPage)
);

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCustomers?.value?.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Reset to first page when search query changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

onMounted(async () => {
  await useShop.getComment(shop.shop?.id);
});
const user = useAccountStore();
const hanlderOnlickCreateMessage = async (userId: number) => {
  await chat.createRoom(userId, user.inforUser?.id);
};

watch(
  () => chat.isEcCreateRoom,
  async (n) => {
    if (n == 0) {
      toast.success(chat.isEmCreateRoom);
      await chat.getListPartner(user.inforUser?.id);
      isOpen.value = false;
      chat.resetiIsNewChat();
    } else if (n == 1) {
      toast.error(chat.isEmCreateRoom);
      chat.resetiIsNewChat();
    }
  }
);
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-semibold text-gray-800">
          Customers to Message
        </h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <XIcon class="h-6 w-6" />
        </button>
      </div>

      <div class="p-4 max-h-96 overflow-y-auto">
        <ul class="space-y-4">
          <li
            v-for="customer in paginatedCustomers"
            :key="customer.commentId"
            class="relative flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
          >
            <img
              :src="customer.image"
              :alt="customer.ProductName"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="flex items-center space-x-2 absolute left-9 top-0">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="flex-grow">
              <h3 class="font-medium text-gray-800">{{ customer.username }}</h3>
              <div class="flex items-center">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  :class="[
                    i <= customer.rating ? 'text-yellow-400' : 'text-gray-300',
                    'h-5 w-5',
                  ]"
                />
              </div>
            </div>
            <button
              @click.prevent="hanlderOnlickCreateMessage(customer.userId)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition duration-150 ease-in-out"
            >
              Message
            </button>
          </li>
        </ul>
      </div>
      <div class="flex justify-between items-center p-4 border-t">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
