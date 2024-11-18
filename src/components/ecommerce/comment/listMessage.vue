<script setup lang="ts">
import { deleteReply, getAllReply, updateReply } from "@/pinia/productStore";
import { ref, computed, onMounted, watch } from "vue";
import { DateTime } from "luxon";
import { toast } from "vue3-toastify";
import EmojiPicker from "vue3-emoji-picker";
const isOpen = defineModel("isOpen");
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const props = defineProps<{
  userId: number;
  commentId: number;
}>();

const editingId = ref(null);
const editText = ref("");

const messages = ref([
  {
    id: 1,
    text: "Hello! Welcome to our platform.",
    timestamp: new Date("2023-05-10T10:00:00"),
  },
  {
    id: 2,
    text: "Don't forget to check out our new features!",
    timestamp: new Date("2023-05-11T14:30:00"),
  },
  {
    id: 3,
    text: "Thank you for being a valued member.",
    timestamp: new Date("2023-05-12T09:15:00"),
  },
]);
const reply = getAllReply();

const formatDate = (inputDate: any) => {
  // Chuyển chuỗi thời gian thành đối tượng DateTime, giữ nguyên múi giờ GMT+7
  // Phân tích chuỗi thời gian và thiết lập múi giờ là UTC+7
  const date = DateTime.fromISO(inputDate, { zone: "UTC" }).setZone(
    "Asia/Bangkok"
  );

  // Định dạng ngày giờ theo yêu cầu
  const formattedDate: string = date.toFormat("MMMM dd, yyyy 'at' hh:mm a");

  return formattedDate;
};

const startEdit = (id: any, text: string) => {
  editingId.value = id;
  editText.value = text;
};

const isHide = ref(false);
const saveEdit = async (id: any) => {
  if (!reply || !reply.listReply) return;
  const index = reply?.listReply.findIndex((m) => m.id === id);
  if (index !== -1) {
    reply.listReply[index] = {
      ...reply?.listReply[index],
      content: editText.value,
      updatedAt: new Date().toISOString(),
    };
  }
  await updateReplies.updateReply({
    userId: props.userId,
    replyId: editingId.value,
    commentId: props.commentId,
    content: editText.value,
  });
  toast.success("Update Reply Successfully");
  cancelEdit();
};

const updateReplies = updateReply();
const cancelEdit = () => {
  editingId.value = null;
  editText.value = "";
};
function addEmoji(emoji: { i: string }) {
  editText.value += emoji.i; // `.i` chứa ký tự emoji
}
const deleteReplt = deleteReply();
const currentReplyId = ref(0);
async function onclickDeleteReply(replyId?: number) {
  if (!replyId) {
    toast.warning("have define reply id");
    return;
  }
  currentReplyId.value = replyId;
  await deleteReplt.deleteReply(props.userId, props.commentId, replyId);
}

watch(
  () => deleteReplt.isEc,
  (n) => {
    if (n == 0) {
      toast.success(deleteReplt.isEM);
      reply.reset();
      reply.listReply = reply.listReply?.filter(
        (item) => item.id != currentReplyId.value
      );
      // closeReplyModal();
    } else if (n == 1) {
      toast.warning(deleteReplt.isEM);
      reply.reset();
    }
  }
);

</script>

<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-6 w-full max-h-full max-w-md overflow-y-scroll"
        role="dialog"
        aria-modal="true"
      >
        <h2 class="text-2xl font-bold mb-4">Messages</h2>
        <div class="h-[300px] overflow-y-auto pr-2">
          <ul class="space-y-4">
            <li
              v-for="message in reply.listReply"
              :key="message.id"
              class="bg-gray-100 p-4 rounded-lg"
            >
              <div v-if="editingId === message.id">
                <input
                  v-model="editText"
                  class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @keyup.enter="saveEdit(message.id)"
                />

                <div class="mt-2 flex justify-end space-x-2">
                  <button
                    @click="saveEdit(message.id)"
                    class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Save
                  </button>
                  <button
                    @click="cancelEdit"
                    class="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="flex justify-between items-start">
                  <p class="text-gray-800">{{ message.content }}</p>
                  <button
                    class="ml-2 text-blue-500 hover:text-blue-600 focus:outline-none"
                    aria-label="Edit message"
                  >
                    <div class="flex">
                      <svg
                        @click="startEdit(message.id, message.content)"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                      <Popover>
                        <PopoverTrigger asChild>
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.69231 8.70833H5V8.16667H9.84615M7.69231 8.70833V19H16.3077V8.70833M7.69231 8.70833H16.3077M16.3077 8.70833H19V8.16667H14.1538M9.84615 8.16667V6H14.1538V8.16667M9.84615 8.16667H14.1538"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M10 11V17"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 11V17"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14 11V17"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div class="text-sm text-gray-900">
                            Bạn có muốn xóa reply này không?
                          </div>
                          <strong
                            @click="onclickDeleteReply(message.id)"
                            class="text-blue-600 underline cursor-pointer flex justify-start"
                            >Xác nhận</strong
                          >
                        </PopoverContent>
                      </Popover>
                    </div>
                  </button>
                </div>
                <p class="text-sm text-gray-500 mt-1">
                  {{ formatDate(message.updatedAt) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div
          v-if="editText != ''"
          @click="isHide = !isHide"
          class="underline text-blue-500 cursor-pointer mt-3"
        >
          To imoji
        </div>
        <div v-if="isHide == true" class="mt-2">
          <EmojiPicker aria-placeholder="select Icon" @select="addEmoji" />
        </div>

        <div class="mt-4 flex justify-end">
          <button
            @click="isOpen = false"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
