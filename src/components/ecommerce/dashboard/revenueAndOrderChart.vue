<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { findExistedShop, getOtherFigueForShops } from "@/pinia/productStore";
import { watch } from "vue";

const chartRef = ref(null);

// Sample data (replace with your actual data)

const statisticalStore = getOtherFigueForShops();
const findShop = findExistedShop();
// watch(
//   () => findShop.shop?.id,
//   async (n) => {
//     await statisticalStore.getOtherFigureForShop(n);
//   }
// );
onMounted(async () => {
  await statisticalStore.getOtherFigureForShop(findShop.shop?.id);
  // const ctx = chartRef.value.getContext("2d");
  // new Chart(ctx, {
  //   type: "bar",
  //   data: chartData,
  //   options: {
  //     responsive: true,
  //     scales: {
  //       "y-axis-1": {
  //         type: "linear",
  //         position: "left",
  //         title: {
  //           display: true,
  //           text: "Số lượng đơn hàng",
  //         },
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //       "y-axis-2": {
  //         type: "linear",
  //         position: "right",
  //         title: {
  //           display: true,
  //           text: "Doanh số (VND)",
  //         },
  //         ticks: {
  //           beginAtZero: true,
  //           callback: function (value) {
  //             return value.toLocaleString() + " VND";
  //           },
  //         },
  //         grid: {
  //           drawOnChartArea: false,
  //         },
  //       },
  //     },
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: "Biểu đồ Doanh số và Đơn hàng",
  //         font: {
  //           size: 18,
  //         },
  //       },
  //       tooltip: {
  //         callbacks: {
  //           label: function (context) {
  //             let label = context.dataset.label || "";
  //             if (label) {
  //               label += ": ";
  //             }
  //             if (context.parsed.y !== null) {
  //               label +=
  //                 context.dataset.label === "Doanh số (VND)"
  //                   ? context.parsed.y.toLocaleString() + " VND"
  //                   : context.parsed.y;
  //             }
  //             return label;
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const ctx = chartRef.value.getContext("2d");

  const newData = {
    labels: statisticalStore.otherFigure?.map((item) => item.month),
    datasets: [
      {
        label: "Đơn hàng",
        type: "bar",
        data: statisticalStore.otherFigure?.map((item) => item.total_Order),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        yAxisID: "y-axis-1",
      },
      {
        label: "Doanh số (VND)",
        type: "line",
        data: statisticalStore.otherFigure?.map((item) => item.total_revenue),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y-axis-2",
      },
    ],
  };
  new Chart(ctx, {
    type: "bar",
    data: newData,
    options: {
      responsive: true,
      scales: {
        "y-axis-1": {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Số lượng đơn hàng",
          },
          ticks: {
            beginAtZero: true,
          },
        },
        "y-axis-2": {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Doanh số (VND)",
          },
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return value.toLocaleString() + " VND";
            },
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Biểu đồ Doanh số và Đơn hàng",
          font: {
            size: 18,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label +=
                  context.dataset.label === "Doanh số (VND)"
                    ? context.parsed.y.toLocaleString() + " VND"
                    : context.parsed.y;
              }
              return label;
            },
          },
        },
      },
    },
  });
});
watch(
  () => statisticalStore.isEc,
  (n) => {
    if (n == 0) {
      const ctx = chartRef.value.getContext("2d");

      const newData = {
        labels: statisticalStore.otherFigure?.map((item) => item.month),
        datasets: [
          {
            label: "Đơn hàng",
            type: "bar",
            data: statisticalStore.otherFigure?.map((item) => item.total_Order),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            yAxisID: "y-axis-1",
          },
          {
            label: "Doanh số (VND)",
            type: "line",
            data: statisticalStore.otherFigure?.map(
              (item) => item.total_revenue
            ),
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
            yAxisID: "y-axis-2",
          },
        ],
      };
      new Chart(ctx, {
        type: "bar",
        data: newData,
        options: {
          responsive: true,
          scales: {
            "y-axis-1": {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Số lượng đơn hàng",
              },
              ticks: {
                beginAtZero: true,
              },
            },
            "y-axis-2": {
              type: "linear",
              position: "right",
              title: {
                display: true,
                text: "Doanh số (VND)",
              },
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return value.toLocaleString() + " VND";
                },
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Biểu đồ Doanh số và Đơn hàng",
              font: {
                size: 18,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label +=
                      context.dataset.label === "Doanh số (VND)"
                        ? context.parsed.y.toLocaleString() + " VND"
                        : context.parsed.y;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    }
  }
);
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>
