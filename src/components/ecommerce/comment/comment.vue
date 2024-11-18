<script setup lang="ts">
import { IratingComment } from "@/interface/user";
import "vue3-emoji-picker/css";
import {
  createShopProduct,
  deleteComments,
  deleteReply,
  findExistedShop,
  getAllReply,
  getCommentForShop,
  replyCommentByPn,
} from "@/pinia/productStore";

import { ref, computed, onMounted, watch, provide } from "vue";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "vue3-emoji-picker";
import { useAccountStore } from "@/pinia/accountStore";
import { toast } from "vue3-toastify";
import ListMessage from "./listMessage.vue";
interface Comment {
  id: string;
  author: string;
  content: string;
  rating: number;
  createdAt: Date;
  productName: string;
}

const shop = getCommentForShop();
const findShop = findExistedShop();
const replys = getAllReply();
watch(
  () => findShop?.shop,
  async () => {
    await shop.getComment(findShop?.shop?.id);
  }
);

onMounted(async () => {
  await shop.getComment(findShop?.shop?.id);
});
const comments = ref<Comment[]>([
  {
    id: "1",
    author: "John Doe",
    content: "Great product! I love how intuitive it is to use.",
    rating: 5,
    createdAt: new Date(),
    productName: "Smartphone X",
  },
  {
    id: "2",
    author: "Jane Smith",
    content: "Could be better. The battery life is not as long as advertised.",
    rating: 3,
    createdAt: new Date(Date.now() - 86400000),
    productName: "Laptop Y",
  },
  // Add more sample comments here
]);

const filterDate = ref("");
const filterRating = ref("");
const showReplyModal = ref(false);
const showDeleteModal = ref(false);
const selectedComment = ref<IratingComment | null>(null);
const replyContent = ref("");
const isModalOpen = ref(false);

// Hàm thêm emoji vào comment
function addEmoji(emoji: { i: string }) {
  replyContent.value += emoji.i; // `.i` chứa ký tự emoji
}
const filteredComments = computed(() => {
  if (!shop?.shopComment) return;
  return shop?.shopComment.filter((comment) => {
    const dateMatch =
      !filterDate.value || formatDate(comment.date) === filterDate.value;
    const ratingMatch =
      !filterRating.value || comment.rating === parseInt(filterRating.value);
    return dateMatch && ratingMatch;
  });
});

const formatDate = (date: string): string => {
  return date.split("T")[0];
};

const openReplyModal = (comment: IratingComment) => {
  selectedComment.value = comment;
  showReplyModal.value = true;
};

const closeReplyModal = () => {
  showReplyModal.value = false;
  selectedComment.value = null;
  replyContent.value = "";
};
const reply = replyCommentByPn();
const store = useAccountStore();
const submitReply = () => {
  if (selectedComment.value && replyContent.value.trim()) {
    reply.replyComment({
      content: replyContent.value,
      commentId: selectedComment.value.commentId,
      userId: store.inforUser?.id,
    });
    // Here you would typically send the reply to your backend
  }
};
watch(
  () => reply.isEc,
  (n) => {
    if (n == 0) {
      toast.success(reply.isEM);
      reply.reset();
      closeReplyModal();
    } else if (n == 1) {
      toast.warning(reply.isEM);
      reply.reset();
    }
  }
);
const openDeleteModal = (comment: IratingComment) => {
  selectedComment.value = comment;
  showDeleteModal.value = true;
};

const openUpdateModal = async (comment: IratingComment) => {
  selectedComment.value = comment;
  isModalOpen.value = true;
  await replys.getAllReply(
    store.inforUser?.id,
    selectedComment.value.commentId
  );
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedComment.value = null;
};

const isHide = ref(false);
const deleteC = deleteComments();
const deleteComment = async () => {
  if (selectedComment.value) {
    shop.shopComment = shop?.shopComment.filter(
      (comment) => comment.commentId !== selectedComment.value?.commentId
    );
    await deleteC.deleteComment(
      store.inforUser?.id,
      selectedComment.value.commentId
    );
    closeDeleteModal();
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Comment Management</h1>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Filters</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            for="date-filter"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Date</label
          >
          <input
            id="date-filter"
            type="date"
            v-model="filterDate"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            for="rating-filter"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Rating</label
          >
          <select
            id="rating-filter"
            v-model="filterRating"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All ratings</option>
            <option v-for="rating in 5" :key="rating" :value="rating">
              {{ rating }} {{ rating === 1 ? "star" : "stars" }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Comments Table -->
    <div class="bg-white shadow rounded-lg overflow-scroll">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Comment
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rating
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="comment in filteredComments"
            :key="comment.commentId"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 w-12 h-12 rounded-s-3xl">
                <img class="rounded-full" :src="comment.image" />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ comment.username }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    class="text-sm text-gray-900 truncate w-40 cursor-pointer"
                  >
                    {{ comment.ProductName }}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div class="text-sm text-gray-900">
                    {{ comment.ProductName }}
                  </div></PopoverContent
                >
              </Popover>
            </td>
            <td class="px-6 py-4">
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    class="text-sm text-gray-900 line-clamp-2 cursor-pointer"
                  >
                    {{ comment.content }}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div class="text-sm text-gray-900">
                    {{ comment.content }}
                  </div></PopoverContent
                >
              </Popover>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'h-5 w-5',
                    star <= comment.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300',
                  ]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ formatDate(comment.date) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="openReplyModal(comment)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Reply
              </button>
              <button
                @click="openUpdateModal(comment)"
                class="mr-3 text-orange-300 hover:text-red-900"
              >
                Replied
              </button>
              <button
                @click="openDeleteModal(comment)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Reply Modal -->
    <div
      v-if="showReplyModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Reply to Comment
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Replying to {{ selectedComment?.username }}'s comment on
                    {{ selectedComment?.ProductName }}
                  </p>
                  <textarea
                    v-model="replyContent"
                    rows="4"
                    class="mt-4 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Type your reply here..."
                  ></textarea>
                  <button
                    type="button"
                    @click="isHide = !isHide"
                    class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <span v-if="isHide == false"> Click to open Emoji</span>
                    <span v-if="isHide == true"> Click to close Emoji</span>
                  </button>
                  <div v-if="isHide">
                    <EmojiPicker
                      aria-placeholder="select Icon"
                      @select="addEmoji"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="submitReply"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send Reply
            </button>
            <button
              @click="closeReplyModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Delete Comment
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this comment? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="deleteComment"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              @click="closeDeleteModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <ListMessage
      v-model:isOpen="isModalOpen"
      :userId="store.inforUser?.id"
      :commentId="selectedComment?.commentId"
    />
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
