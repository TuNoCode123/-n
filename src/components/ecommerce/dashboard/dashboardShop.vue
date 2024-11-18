<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  BarChart,
  Bell,
  Menu,
  Star,
} from "lucide-vue-next";
import Chart from "chart.js/auto";
import Multiselect from "vue-multiselect";
import {
  findExistedShop,
  getFigueForShops,
  getOtherFigueForShops,
} from "@/pinia/productStore";
import { formatCurrencyWithoutSymbol } from "@/util/formatMoney";
import StatisticalTime from "./statisticalTime.vue";
import { VueSpinner } from "vue3-spinners";
import StarSvg from "@/components/SvgComponent/starSvg.vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OrderState from "./orderState.vue";
import RevenueAndOrderChart from "./revenueAndOrderChart.vue";
const sidebarOpen = ref(true);
const profileMenuOpen = ref(false);
const salesChart = ref(null);
const categoriesChart = ref(null);
const statusChart = ref(null);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value;
};

const orderHeaders = ["Order ID", "Product", "Customer", "Total", "Status"];

const recentOrders = [
  {
    id: "1",
    product: "Widget A",
    customer: "John Doe",
    total: "$50.00",
    status: "Completed",
  },
  {
    id: "2",
    product: "Gadget B",
    customer: "Jane Smith",
    total: "$75.00",
    status: "Processing",
  },
  {
    id: "3",
    product: "Tool C",
    customer: "Bob Johnson",
    total: "$100.00",
    status: "Shipped",
  },
  {
    id: "4",
    product: "Device D",
    customer: "Alice Brown",
    total: "$200.00",
    status: "Completed",
  },
  {
    id: "5",
    product: "Accessory E",
    customer: "Charlie Davis",
    total: "$30.00",
    status: "Processing",
  },
];
const range = ref({ start: new Date(), end: new Date() });

const dateRange = ref<string | Date[]>([]); // Lưu khoảng thời gian được chọn
const showCalendarDialog = ref(false); // Điều khiển việc hiển thị modal CalendarDialog

const showDialog = () => {
  showCalendarDialog.value = true; // Mở CalendarDialog
};
const dateFilters = [
  { label: "Hôm nay", value: "today" },
  { label: "Hôm qua", value: "yesterday" },
  { label: "Tuần này", value: "this_week" },
  { label: "Tháng này", value: "this_month" },
  { label: "Quý này", value: "this_quarter" },
  { label: "Năm nay", value: "this_year" },
  { label: "Tuần trước", value: "last_week" },
  { label: "Tháng trước", value: "last_month" },
  { label: "Tùy chỉnh", value: "custom_range" },
];
const value = ref({ label: "Tháng này", value: "this_month" });
const findShop = findExistedShop();
watch(
  () => value.value.value,
  async (n) => {
    await getFigureStore.getFigureForShop({
      shopId: findShop.shop?.id,
      type: n,
    });
  }
);
const statisticalStore = getOtherFigueForShops();
watch(
  () => findShop.shop?.id,
  async (n) => {
    await getFigureStore.getFigureForShop({
      shopId: n,
      type: value.value.value,
    });
    await statisticalStore.getOtherFigureForShop(n);
  }
);
const getFigureStore = getFigueForShops();
const categoies = getOtherFigueForShops();
onMounted(async () => {
  await getFigureStore.getFigureForShop({
    shopId: findShop.shop?.id,
    type: value.value.value,
  });
  const categoriesCtx = categoriesChart.value.getContext("2d");
  new Chart(categoriesCtx, {
    type: "doughnut",
    data: {
      labels: categoies.categories?.map((item) => item.category),
      datasets: [
        {
          data: categoies.categories?.map((item) => item.total_products),
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Số lượng sản phẩm trên mỗi category",
        },
      },
    },
  });

  const salesCtx = salesChart.value.getContext("2d");
  const colors = [
    "rgba(255, 99, 132, 0.6)", // Màu cho sản phẩm 1
    "rgba(54, 162, 235, 0.6)", // Màu cho sản phẩm 2
    "rgba(255, 206, 86, 0.6)", // Màu cho sản phẩm 3
    "rgba(75, 192, 192, 0.6)", // Màu cho sản phẩm 4
    "rgba(153, 102, 255, 0.6)", // Màu cho sản phẩm 5
  ];
  new Chart(salesCtx, {
    type: "bar",
    data: {
      labels: categoies.listMonth,
      datasets: categoies.listProductsPerMonth?.map((item, index) => {
        return {
          label: item.name,
          data: item.sellMonth,
          backgroundColor: colors[index % colors.length], // Chọn màu theo index sản phẩm
          // borderColor: "rgba(255, 99, 132, 1)", // Màu viền
          borderWidth: 1,
        };
      }),
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          // ticks: {
          //   callback: function (value) {
          //     return "$" + value / 1000 + "k";
          //   },
          // },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Những sản phẩm được bán nhiều nhất theo từng tháng",
        },
      },
    },
  });

  const statusCtx = statusChart.value.getContext("2d");
  const Utils = {
    CHART_COLORS: {
      red: "rgba(255, 99, 132, 0.6)", // Màu đỏ
      blue: "rgba(54, 162, 235, 0.6)", // Màu xanh dương
      yellow: "rgba(255, 206, 86, 0.6)", // Màu vàng
      green: "rgba(75, 192, 192, 0.6)", // Màu xanh lá
      purple: "rgba(153, 102, 255, 0.6)", // Màu tím
      orange: "rgba(255, 159, 64, 0.6)", // Màu cam
    },
  };

  const data = {
    labels: categoies.listStatus?.map((item) => item.name), // Nhãn cho các phân đoạn
    datasets: [
      {
        label: "My First Dataset", // Tên dataset
        data: categoies.listStatus?.map((item) => item.percent), // Dữ liệu cho từng phân đoạn
        backgroundColor: Object.values(Utils.CHART_COLORS), // Màu sắc cho các phân đoạn
        hoverOffset: 4, // Kích thước khi di chuột qua
      },
    ],
  };

  // Cấu hình biểu đồ Pie
  const config = {
    type: "pie", // Loại biểu đồ là Pie
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": " + tooltipItem.raw; // Hiển thị thông tin chi tiết khi hover
            },
          },
        },
      },
    },
  };
  new Chart(statusCtx, config);
  // Sales Chart
  // const salesCtx = salesChart.value.getContext("2d");
  // new Chart(salesCtx, {
  //   type: "bar",
  //   data: {
  //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //     datasets: [
  //       {
  //         label: "Sales",
  //         data: [12000, 19000, 15000, 25000, 22000, 30000],
  //         backgroundColor: "rgba(99, 102, 241, 0.6)",
  //         borderColor: "rgb(99, 102, 241)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //         ticks: {
  //           callback: function (value) {
  //             return "$" + value / 1000 + "k";
  //           },
  //         },
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //     },
  //   },
  // });

  // Product Categories Chart
});
watch(
  () => categoies.isEc,
  async (n) => {
    if (n == 0) {
      const categoriesCtx = categoriesChart.value.getContext("2d");
      new Chart(categoriesCtx, {
        type: "doughnut",
        data: {
          labels: categoies.categories?.map((item) => item.category),
          datasets: [
            {
              data: categoies.categories?.map((item) => item.total_products),
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "Số lượng sản phẩm trên mỗi category",
            },
          },
        },
      });

      const salesCtx = salesChart.value.getContext("2d");
      const colors = [
        "rgba(255, 99, 132, 0.6)", // Màu cho sản phẩm 1
        "rgba(54, 162, 235, 0.6)", // Màu cho sản phẩm 2
        "rgba(255, 206, 86, 0.6)", // Màu cho sản phẩm 3
        "rgba(75, 192, 192, 0.6)", // Màu cho sản phẩm 4
        "rgba(153, 102, 255, 0.6)", // Màu cho sản phẩm 5
      ];
      new Chart(salesCtx, {
        type: "bar",
        data: {
          labels: categoies.listMonth,
          datasets: categoies.listProductsPerMonth?.map((item, index) => {
            return {
              label: item.name,
              data: item.sellMonth,
              backgroundColor: colors[index % colors.length], // Chọn màu theo index sản phẩm
              // borderColor: "rgba(255, 99, 132, 1)", // Màu viền
              borderWidth: 1,
            };
          }),
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              // ticks: {
              //   callback: function (value) {
              //     return "$" + value / 1000 + "k";
              //   },
              // },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Những sản phẩm được bán nhiều nhất theo từng tháng",
            },
          },
        },
      });

      const statusCtx = statusChart.value.getContext("2d");
      const Utils = {
        CHART_COLORS: {
          red: "rgba(255, 99, 132, 0.6)", // Màu đỏ
          blue: "rgba(54, 162, 235, 0.6)", // Màu xanh dương
          yellow: "rgba(255, 206, 86, 0.6)", // Màu vàng
          green: "rgba(75, 192, 192, 0.6)", // Màu xanh lá
          purple: "rgba(153, 102, 255, 0.6)", // Màu tím
          orange: "rgba(255, 159, 64, 0.6)", // Màu cam
        },
      };

      const data = {
        labels: categoies.listStatus?.map((item) => item.name), // Nhãn cho các phân đoạn
        datasets: [
          {
            label: "My First Dataset", // Tên dataset
            data: categoies.listStatus?.map((item) => item.percent), // Dữ liệu cho từng phân đoạn
            backgroundColor: Object.values(Utils.CHART_COLORS), // Màu sắc cho các phân đoạn
            hoverOffset: 4, // Kích thước khi di chuột qua
          },
        ],
      };

      // Cấu hình biểu đồ Pie
      const config = {
        type: "pie", // Loại biểu đồ là Pie
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.label + ": " + tooltipItem.raw; // Hiển thị thông tin chi tiết khi hover
                },
              },
            },
          },
        },
      };
      new Chart(statusCtx, config);
    }
  }
);
</script>

<template>
  <div
    v-if="getFigureStore.isLoading"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
  >
    <!-- Vue Spinner -->
    <VueSpinner size="45" color="rgb(93, 197, 150)" />
    <!-- Thông điệp "Đang tải..." nếu cần -->
    <p class="text-white mt-4">Đang tải...</p>
  </div>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <!-- Sử dụng DatePicker -->

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->

      <!-- Dashboard Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <h1 class="text-3xl font-semibold text-gray-800 mb-6">
          Dashboard Overview
        </h1>
        <div class="mb-3">
          <multiselect
            v-model="value"
            :options="dateFilters"
            placeholder="Select one"
            label="label"
            track-by="label"
          ></multiselect>
        </div>
        <div>
          <StatisticalTime :dateRange="getFigureStore.figue?.date" />
        </div>
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div
            v-for="stat in getFigureStore.figue?.DT"
            :key="stat.type"
            class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-gray-600">
                {{ stat.type }}
              </h2>

              <component
                v-if="stat.type == 'Doanh thu'"
                :is="DollarSign"
                size="24"
                :class="stat.iconColor"
              />
              <component
                v-if="stat.type == 'Sản phẩm'"
                :is="Package"
                size="24"
                :class="stat.iconColor"
              />
              <Popover v-if="stat.type == 'Đơn hàng'">
                <PopoverTrigger asChild>
                  <component
                    :is="ShoppingCart"
                    size="24"
                    :class="stat.iconColor"
                    class="cursor-pointer"
                /></PopoverTrigger>
                <PopoverContent>
                  <OrderState :orderData="stat.detailOrder" />
                </PopoverContent>
              </Popover>

              <component
                v-if="stat.type == 'Đánh giá'"
                :is="Star"
                size="24"
                :class="stat.iconColor"
              />
            </div>

            <div
              v-if="stat.type == 'Đánh giá'"
              class="text-2xl font-bold break-words flex items-center gap-1"
              :class="stat.valueColor"
            >
              {{ stat.cur }} <StarSvg />
            </div>

            <div
              v-else
              class="text-2xl font-bold break-words"
              :class="stat.valueColor"
            >
              {{ stat.cur }}
            </div>
            <p class="text-sm" :class="stat.changeColor">{{ stat.change }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Sales Chart -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Tổng quan đơn hàng</h2>
            <canvas ref="statusChart"></canvas>
          </div>
          <!-- Product Categories Chart -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Danh mục sản phẩm</h2>
            <canvas ref="categoriesChart"></canvas>
          </div>
        </div>
        <!-- Charts Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <RevenueAndOrderChart />
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 mt-3">
          <h2 class="text-xl font-semibold mb-4">Monthly Sales</h2>
          <canvas ref="salesChart"></canvas>
        </div>

        <!-- Recent Orders -->
        <!-- <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Recent Orders</h2>
            <button
              class="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
            >
              View All Orders
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    v-for="header in orderHeaders"
                    :key="header"
                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in recentOrders"
                  :key="order.id"
                  class="hover:bg-gray-50"
                >
                  <td
                    v-for="(value, key) in order"
                    :key="key"
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                  >
                    <div
                      v-if="key != 'status'"
                      class="text-sm leading-5 text-gray-900"
                    >
                      {{ value }}
                    </div>
                    <div v-else>
                      <td class="whitespace-no-wrap">
                        <span
                          :class="[
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                            order.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800',
                          ]"
                        >
                          {{ value }}
                        </span>
                      </td>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
      </main>
    </div>
  </div>
</template>
<style scoped>
.flex-1::-webkit-scrollbar {
  display: none; /* Ẩn thanh cuộn */
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
