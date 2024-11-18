<script setup lang="ts">
import { ref, defineModel, defineEmits } from "vue";

const message = ref("");
const isRecording = ref(false);
const showEmojiPicker = ref(false);
const fileInput = ref(null);
const newMessage = defineModel("newMessage");
const emit = defineEmits(["sendMessage", "handleImageSelect"]);
const sendMessage = () => {
  emit("sendMessage");
};

const startRecording = () => {
  isRecording.value = true;
  console.log("Started recording");
  // Implement actual recording logic here
};

const stopRecording = () => {
  isRecording.value = false;
  console.log("Stopped recording");
  // Implement logic to handle the recorded audio
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

const addEmoji = (emoji: string) => {
  newMessage.value += emoji;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event: Event) => {
  emit("handleImageSelect", event);
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-4 w-full">
    <div class="flex items-center space-x-2">
      <button
        @click="toggleEmojiPicker"
        class="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        @click="triggerFileInput"
        class="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </button>
      <div class="relative flex-grow">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type a message..."
          class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
        />
        <button
          v-if="isRecording"
          @click="stopRecording"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-600 focus:outline-none transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>
        </button>
        <button
          v-else
          @click="startRecording"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
      </div>
      <button
        @click="sendMessage"
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      class="hidden"
      accept="image/*,video/*,audio/*"
    />
    <div
      v-if="showEmojiPicker"
      class="mt-2 p-2 bg-white border rounded-lg shadow-lg"
    >
      <!-- Simplified emoji picker -->
      <div class="grid grid-cols-8 gap-1">
        <button
          v-for="emoji in [
            '😀',
            '😂',
            '😍',
            '🤔',
            '😎',
            '👍',
            '❤️',
            '🎉',
            '😑',
            '👍',
            '😓',
          ]"
          :key="emoji"
          @click="addEmoji(emoji)"
          class="text-2xl hover:bg-gray-100 rounded p-1 focus:outline-none"
        >
          {{ emoji }}
        </button>
      </div>
    </div>
  </div>
</template>
