<script setup lang="ts">
import {
  changeOrderStateForShop,
  getAllOrderForShop,
} from "@/pinia/orderStore";
import { createShopProduct, findExistedShop } from "@/pinia/productStore";
import { parseDate } from "@/util/parserDate";
import { ref, computed, onMounted, watch, nextTick } from "vue";
import ModalDetailProduct from "./modalDetailProduct.vue";
import gsap from "gsap";
import { toast } from "vue3-toastify";
import { VueSpinner } from "vue3-spinners";
// Mock data for demonstration
const orders = ref([
  {
    id: "ORD001",
    customerName: "John Doe",
    orderDate: "2023-05-01",
    status: "Completed",
    totalAmount: 150.99,
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    orderDate: "2023-05-02",
    status: "Processing",
    totalAmount: 89.5,
  },
  {
    id: "ORD003",
    customerName: "Bob Johnson",
    orderDate: "2023-05-03",
    status: "Pending",
    totalAmount: 200.0,
  },
  {
    id: "ORD004",
    customerName: "Alice Brown",
    orderDate: "2023-05-04",
    status: "Shipped",
    totalAmount: 75.25,
  },
  {
    id: "ORD005",
    customerName: "Charlie Wilson",
    orderDate: "2023-05-05",
    status: "Cancelled",
    totalAmount: 120.75,
  },
  // Add more mock data to demonstrate pagination
  {
    id: "ORD006",
    customerName: "David Lee",
    orderDate: "2023-05-06",
    status: "Completed",
    totalAmount: 180.5,
  },
  {
    id: "ORD007",
    customerName: "Eva Green",
    orderDate: "2023-05-07",
    status: "Processing",
    totalAmount: 95.75,
  },
  {
    id: "ORD008",
    customerName: "Frank White",
    orderDate: "2023-05-08",
    status: "Pending",
    totalAmount: 220.0,
  },
  {
    id: "ORD009",
    customerName: "Grace Taylor",
    orderDate: "2023-05-09",
    status: "Shipped",
    totalAmount: 130.25,
  },
  {
    id: "ORD010",
    customerName: "Henry Clark",
    orderDate: "2023-05-10",
    status: "Completed",
    totalAmount: 175.0,
  },
]);

const searchQuery = ref("");
const statusFilter = ref("");
const startDate = ref("");
const endDate = ref("");
const sortOrder = ref("desc");
const isModalOpen = ref(false);
const selectedOrder = ref<any>();
const modalText = ref("");
const openPrep = ref(false);
const openShipping = ref(false);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

const uniqueStatuses = computed(() => {
  if (!orderStore.listOrderItems) return;
  return [
    ...new Set(
      orderStore.listOrderItems.map((order) => order.status_allcode.valueEn)
    ),
  ];
});

const filteredAndSortedOrders = computed(() => {
  if (!orderStore?.listOrderItems) return;
  let result = orderStore.listOrderItems.filter(
    (order) =>
      (order.guess.email
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
        order.id == +searchQuery.value.toLowerCase()) &&
      (statusFilter.value === "" ||
        order.status_allcode.valueEn === statusFilter.value) &&
      (!startDate.value ||
        new Date(parseDate(order.createdAt)) >= new Date(startDate.value)) &&
      (!endDate.value ||
        new Date(parseDate(order.createdAt)) <= new Date(endDate.value))
  );
  result.sort((a, b) => {
    if (sortOrder.value === "desc") {
      return b.price - a.price;
    } else {
      return a.price - b.price;
    }
  });

  return result;
});

const totalPages = computed(() => {
  if (!filteredAndSortedOrders.value) return 1;
  return Math.ceil(filteredAndSortedOrders.value.length / itemsPerPage);
});

const paginatedOrders = computed(() => {
  if (!filteredAndSortedOrders.value) return;
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAndSortedOrders.value.slice(start, end);
});

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => {
  if (!filteredAndSortedOrders.value) return 1;
  return Math.min(
    startIndex.value + itemsPerPage,
    filteredAndSortedOrders.value.length
  );
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const getStatusClass = (status: string) => {
  const classes = {
    Delivered: "bg-green-100 text-green-800",
    Prepared: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Shipping: "bg-purple-100 text-purple-800",
    Voided: "bg-red-100 text-red-800",
  };

  return classes[status] || "bg-gray-100 text-gray-800";
};

const openModal = (order: any) => {
  selectedOrder.value = order;
  isModalOpen.value = true;
  modalText.value = "";
};
const openModalPrep = (order: any) => {
  selectedOrder.value = order;
  openPrep.value = true;
};

const openModalShipping = (order: any) => {
  selectedOrder.value = order;
  openShipping.value = true;
};
const changeStateStore = changeOrderStateForShop();
const submitAction = async (nameVi: string, nameEn: string) => {
  const cusomPro = {
    name: selectedOrder.value.infor_Order
      ? selectedOrder.value.pro_Order.nameVi +
        " " +
        selectedOrder.value.infor_Order.v
      : selectedOrder.value.pro_Order.nameVi,
    quantity: selectedOrder.value.quantity,
    price: selectedOrder.value.price,
  };
  await changeStateStore.changeState(
    selectedOrder.value.id,
    selectedOrder.value.orderId,
    nameEn,
    modalText.value,
    selectedOrder.value.shopId,
    selectedOrder.value.guess,
    nameVi,
    cusomPro
  );

  // isModalOpen.value = false;
  // Optionally, you could update the order status or add the action to the order object here
};
watch(
  () => changeStateStore.ec,
  async (n) => {
    if (n == 0) {
      isModalOpen.value = false;
      openPrep.value = false;
      openShipping.value = false;
      toast.success(changeStateStore.em);
      changeStateStore.$reset();
      await orderStore.getAllOrderForShop(shopStore?.shop?.id);
    } else if (n == 1) {
      toast.error(changeStateStore.em);
      changeStateStore.$reset();
    }
  }
);
const sortByAmount = () => {
  sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
};

const resetFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  startDate.value = "";
  endDate.value = "";
  sortOrder.value = "desc";
  currentPage.value = 1;
};

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

const goToPage = (page: number) => {
  currentPage.value = page;
};

const shopStore = findExistedShop();
const orderStore = getAllOrderForShop();
watch(
  () => shopStore?.shop,
  async () => {
    await orderStore.getAllOrderForShop(shopStore?.shop?.id);
  }
);
const isOpen = ref(false);
function expandNameProduct(item: any, item1: any, quantity: number) {
  if (!item1) {
    currentItem.value = item;
  } else {
    currentItem.value = {
      ...item,
      ...item1,
      quantity,
    };
  }
  openModalDetail();
}
const modalContent = ref(null);
const modalContainer = ref(null);
const currentItem = ref();
function openModalDetail() {
  isOpen.value = true;
  nextTick(() => {
    gsap.to(modalContainer.value, {
      duration: 0.3,
      opacity: 1,
      ease: "power2.out",
    });
    gsap.to(modalContent.value, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.7)",
    });
  });
}

onMounted(async () => {
  await orderStore.getAllOrderForShop(shopStore?.shop?.id);
});
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Order Management</h1>

    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by customer name or order ID"
        class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="statusFilter"
        class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option v-for="status in uniqueStatuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
      <button
        @click="sortByAmount"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Xắp xếp theo giá {{ sortOrder === "desc" ? "↓" : "↑" }}
      </button>
    </div>

    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label for="startDate" class="block text-sm font-medium text-gray-700"
          >Start Date</label
        >
        <input
          id="startDate"
          v-model="startDate"
          type="date"
          class="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <div>
        <label for="endDate" class="block text-sm font-medium text-gray-700"
          >End Date</label
        >
        <input
          id="endDate"
          v-model="endDate"
          type="date"
          class="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <button
        @click="resetFilters"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 self-end"
      >
        Reset Filters
      </button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order Date
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Amount
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order Confirm
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order Delete
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="order in paginatedOrders"
            :key="order.id"
            class="hover:bg-gray-50"
          >
            <td
              @click="
                () =>
                  expandNameProduct(
                    order.pro_Order,
                    order.infor_Order,
                    order.inventory
                  )
              "
              class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-[200px]"
            >
              {{ order.pro_Order.nameVi }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ order.guess.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ order.createdAt }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="getStatusClass(order.status_allcode.valueEn)"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ order.status_allcode.valueEn }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatCurrency(order.price / 25000) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
                v-if="order.status == 'SOI1'"
                @click="openModalPrep(order)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Prepared Confirm
              </button>
              <button
                v-if="order.status == 'SOI2'"
                @click="openModalShipping(order)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Shipping Confirm
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
                v-if="
                  order.status_allcode.valueEn != 'Voided' &&
                  order.status_allcode.valueEn != 'Delivered'
                "
                @click="openModal(order)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <div>
        <span class="text-sm text-gray-700">
          Showing {{ startIndex + 1 }} to {{ endIndex }} of
          {{ filteredAndSortedOrders?.length }} entries
        </span>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              currentPage === page
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :class="{
              'opacity-50 cursor-not-allowed': currentPage === totalPages,
            }"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
    <ModalDetailProduct
      v-model:isOpen="isOpen"
      v-model:modalContent="modalContent"
      v-model:modalContainer="modalContainer"
      v-model:currentItem="currentItem"
    />
    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="modal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div
          class="text-end cursor-pointer uppercase"
          @click.prevent="() => (isModalOpen = false)"
        >
          x
        </div>
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Hủy đơn</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Order items ID: {{ selectedOrder?.id }}
            </p>
            <textarea
              v-model="modalText"
              class="mt-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Enter your action notes here..."
            ></textarea>
          </div>
          <div class="items-center px-4 py-3">
            <button
              v-if="!changeStateStore.loading"
              @click="submitAction('Hủy', 'Voided')"
              class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              xác nhận
            </button>
            <VueSpinner v-else size="45" color="rgb(93, 197, 150)" />
          </div>
        </div>
      </div>
    </div>

    <!-- modal prepared -->
    <div
      v-if="openPrep"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="modal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div
          class="text-end cursor-pointer uppercase"
          @click.prevent="() => (openPrep = false)"
        >
          x
        </div>
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Xác nhận là bạn sẽ nhận đơn hàng này
          </h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Order items ID: {{ selectedOrder?.id }}
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              v-if="!changeStateStore.loading"
              @click="submitAction('Chờ chuẩn bị', 'Prepared')"
              class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              xác nhận
            </button>
            <VueSpinner v-else size="45" color="rgb(93, 197, 150)" />
          </div>
        </div>
      </div>
    </div>
    <!-- modal shipping -->
    <div
      v-if="openShipping"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="modal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div
          class="text-end cursor-pointer uppercase"
          @click.prevent="() => (openShipping = false)"
        >
          x
        </div>
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Xác nhận là bạn đã giao đơn hàng này cho bên vận chuyển!
          </h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Order items ID: {{ selectedOrder?.id }}
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              v-if="!changeStateStore.loading"
              @click="submitAction('Đang giao hàng', 'Shipping')"
              class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              xác nhận
            </button>
            <VueSpinner v-else size="45" color="rgb(93, 197, 150)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
