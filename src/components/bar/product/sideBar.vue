<script setup>
import { ref } from "vue";
import {
  ShoppingCart,
  Package,
  ClipboardList,
  Menu,
  FolderTree,
  MessageSquare,
  LayoutDashboard,
  ChevronDown,
  User,
  BadgeDollarSign,
  MessageCircleMore,
} from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { useAccountStore } from "@/pinia/accountStore";

const activeDropdown = ref(null);
const user = useAccountStore();
const toggleDropdown = (dropdown) => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown;
};
</script>

<template>
  <aside class="w-64 min-h-screen bg-white border-r border-gray-200">
    <!-- System Header -->
    <div class="h-16 flex items-center px-6 border-b border-gray-200">
      <h1 class="text-xl font-semibold text-gray-800">system</h1>
    </div>

    <!-- Navigation -->
    <nav class="px-4 py-4">
      <!-- Apps & Pages Section -->
      <div class="mb-6">
        <h2
          class="px-2 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Apps & Pages
        </h2>

        <!-- Navigation Items -->
        <div class="space-y-1">
          <!-- eCommerce Dropdown -->
          <div v-if="user.inforUser?.roleId === 'R1'" class="relative">
            <button
              @click="toggleDropdown('ecommerce')"
              class="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-2">
                <User class="w-5 h-5" />
                <RouterLink to="/user"> <span>User</span></RouterLink>
              </div>
            </button>
          </div>

          <!-- Products Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('products')"
              class="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-2">
                <Package class="w-5 h-5" />
                <span>Products</span>
              </div>
              <ChevronDown
                :class="[
                  'w-4 h-4 transition-transform',
                  activeDropdown === 'products' ? 'transform rotate-180' : '',
                ]"
              />
            </button>
            <div
              v-show="activeDropdown === 'products'"
              class="mt-1 pl-9 space-y-1"
            >
              <a
                href="#"
                class="block px-2 py-1.5 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <RouterLink to="/product">
                  <span> Add Product</span></RouterLink
                >
              </a>
              <a
                href="#"
                class="block px-2 py-1.5 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <RouterLink to="/attribute">
                  <span> Product List</span></RouterLink
                >
              </a>
            </div>
          </div>
          <!-- coupon -->
          <div v-if="user.inforUser?.roleId === 'R1'" class="relative">
            <button
              @click="toggleDropdown('ecommerce')"
              class="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-2">
                <BadgeDollarSign class="w-5 h-5" />
                <RouterLink to="/coupon"> <span>Coupon</span></RouterLink>
              </div>
            </button>
          </div>

          <!-- Orders Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown('orders')"
              class="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-2">
                <ClipboardList class="w-5 h-5" />
                <RouterLink to="/order"> <span>Orders</span></RouterLink>
              </div>
            </button>
          </div>

          <!-- Categories -->
          <a
            href="#"
            class="block px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-2">
              <FolderTree class="w-5 h-5" />
              <RouterLink to="/category"> <span>Categories</span></RouterLink>
            </div>
          </a>

          <!-- Comment -->
          <a
            href="#"
            class="block px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-2">
              <MessageSquare class="w-5 h-5" />
              <RouterLink to="/comment"> <span>Comment</span></RouterLink>
            </div>
          </a>

          <!-- Dashboard -->
          <a
            href="#"
            class="block px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-2">
              <LayoutDashboard class="w-5 h-5" />

              <RouterLink to="/dashboard"> <span>DashBoard</span></RouterLink>
            </div>
          </a>

          <a
            href="#"
            class="block px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-2">
              <MessageCircleMore class="w-5 h-5" />

              <RouterLink to="/message"> <span>Message</span></RouterLink>
            </div>
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
/* Add smooth transitions for dropdowns */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

/* Optional: Add a subtle shadow to the sidebar */
aside {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}
</style>
