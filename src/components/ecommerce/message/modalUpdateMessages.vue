<script setup lang="ts">
import { Imess } from "@/interface/user";
import { Ref } from "vue";
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  initialMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:message"]);

const isOpen = defineModel<Ref<boolean>>("isOpen");
const textCurrent = defineModel<Ref<string>>("textCurrent");
const editedMessage = ref(props.initialMessage);
const messageInput = ref(null);

watch(isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      messageInput.value.focus();
    });
  }
});

const closeModal = () => {
  isOpen.value = false;
  //   editedMessage.value = props.initialMessage;
};

const saveMessage = () => {
  if (textCurrent.value.trim()) {
    emit("update:message", editedMessage.value);
    closeModal();
  }
};

const clearInput = () => {
  editedMessage.value = "";
  messageInput.value.focus();
};
</script>

<template>
  <div>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
          >
            <Transition name="modal-backdrop">
              <div
                v-if="isOpen"
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                @click="closeModal"
              ></div>
            </Transition>

            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >

            <Transition name="modal-content">
              <div
                v-if="isOpen"
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                @keydown.esc="closeModal"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div
                      class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"
                    >
                      <h3
                        class="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Edit Message
                      </h3>
                      <div class="mt-2">
                        <form @submit.prevent="saveMessage" class="space-y-4">
                          <div class="relative">
                            <input
                              v-model="textCurrent"
                              type="text"
                              class="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your message"
                              ref="messageInput"
                              @keydown.enter="saveMessage"
                            />
                            <span
                              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                              @click="clearInput"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                >
                  <button
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="saveMessage"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
