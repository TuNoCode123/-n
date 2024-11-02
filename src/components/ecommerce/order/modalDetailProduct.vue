<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { nextTick } from "vue";

// const isOpen = ref(false);
const isOpen = defineModel("isOpen");
const modalContainer = defineModel("modalContainer");
const modalContent = defineModel("modalContent");
const currentItem = defineModel("currentItem");

const closeModal = () => {
  gsap.to(modalContent.value, {
    duration: 0.5,
    opacity: 0,
    y: -50,
    scale: 0.9,
    ease: "back.in(1.7)",
    onComplete: () => {
      gsap.to(modalContainer.value, {
        duration: 0.3,
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
          isOpen.value = false;
        },
      });
    },
  });
};

const handleKeydown = (event) => {
  if (event.key === "Escape" && isOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
const product = ref({
  name: "Smartphone X Pro",
  brand: "TechMaster",
  originalPrice: 999.99,
  currentPrice: 799.99,
  image: "/placeholder.svg?height=300&width=300",
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<template>
  <div class="flex items-center justify-center bg-gray-100">
    <!-- <button
      @click="openModal"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
    >
      Mở Modal
    </button> -->

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="modalContainer"
        class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
        @click.self="closeModal"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          ref="modalContent"
          class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 opacity-0"
        >
          <div class="relative p-6">
            <button
              @click="closeModal"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 id="modal-title" class="text-2xl font-bold mb-4">
              Chi tiết sản phẩm
            </h2>
            <div
              class="max-w-sm mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl"
            >
              <div class="md:flex flex-col">
                <div class="md:shrink-0">
                  <img
                    class="h-48 w-full object-cover md:h-full md:w-48"
                    :src="currentItem?.image"
                  />
                </div>
                <div class="p-8">
                  <div
                    class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
                  >
                    {{ currentItem?.branch }}
                  </div>
                  <a
                    href="#"
                    class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                    >{{ currentItem?.nameVi }}</a
                  >
                  <p class="mt-2 text-slate-500">
                    <span class="line-through">{{
                      formatPrice(currentItem?.price)
                    }}</span>
                    <span class="ml-2 text-red-600 font-bold">{{
                      formatPrice(currentItem?.totalPrices)
                    }}</span>
                  </p>
                  <div class="uppercase tracking-wide text-sm font-semibold">
                    Tồn kho: {{ currentItem?.quantity }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
