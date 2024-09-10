<script setup lang="ts">
import { ref, provide, onMounted, KeepAlive, toRaw, watch } from "vue";
import ModalUser from "./modalUser.vue";

import { useUserStore } from "@/pinia/userStore";
import Table from "@/components/shareComponent/table.vue";
import { VueSpinner } from "vue3-spinners";

const isOpen = ref(false);
provide("isOpen", isOpen);
const store = useUserStore();

onMounted(async () => {
  await Promise.all([
    store.getAllUser(),
    store.getType("gender"),
    store.getRoleId("role"),
  ]);
});

async function hanlderOnclickDelete(id: any) {
  await store.delUser(id);
}
watch(
  () => store.ecDelUser,
  async (newValue, oldValue) => {
    console.log(newValue);
    if (newValue == 0) {
      await store.getAllUser();
    }
  }
);
provide("delUser", hanlderOnclickDelete);
</script>

<template>
  <div>
    <div class="text-3xl p-2">Manage Users</div>

    <div class="m-2">
      <KeepAlive>
        <ModalUser />
      </KeepAlive>
    </div>
    <VueSpinner
      v-if="store.isLoadingDelUser"
      size="45"
      color="rgb(93, 197, 150)"
    />
    <div v-else class="p-4s">
      <Table :data="toRaw(store.listUsers)" />
    </div>
  </div>
</template>

<style scoped></style>
