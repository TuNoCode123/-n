<script setup lang="ts">
import {
  ref,
  provide,
  onMounted,
  KeepAlive,
  toRaw,
  watch,
  reactive,
} from "vue";
import ModalUser from "./modalUser.vue";

import { useUpdateUserStore, useUserStore } from "@/pinia/userStore";
import Table from "@/components/shareComponent/table.vue";
import { VueSpinner } from "vue3-spinners";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Iuser } from "@/interface/user";

import ModalUpdate from "./modalUpdate.vue";
import { copyObject } from "@/util/copy";
import { differentObject } from "@/util/relationShip";
import { useCategoryStore } from "@/pinia/categoryStore";

const isOpen = ref(false);
provide("isOpen", isOpen);
const isOpenModalUpdate = ref(false);
function setIsOpen() {
  isOpen.value = !isOpen.value;
}
provide("setIsOpen", setIsOpen);
const store = useUserStore();

async function hanlderOnclickDelete(id: any) {
  await store.delUser(id);
}

watch(
  () => store.ecDelUser,
  async (newValue, oldValue) => {
    if (newValue == 0) {
      await store.getAllUser();
      await store.resetStateUser();
      toast.success("delete user success", {
        autoClose: 1000,
      });
    } else if (newValue == 1) {
      toast.warning("delete user faild", {
        autoClose: 1000,
      });
      await store.resetStateUser();
    }
  }
);
provide("delUser", hanlderOnclickDelete);

const currentUser = reactive<Partial<Iuser>>({});
const initCurrentUser = ref<any>();
function hanlderClickUpdate(user: Iuser) {
  Object.assign(currentUser, user);
  initCurrentUser.value = copyObject(user);
  isOpenModalUpdate.value = !isOpenModalUpdate.value;
}
provide("currentUser", currentUser);
const useUpdate = useUpdateUserStore();
async function hanlderSubmitUpdate() {
  const newUser = differentObject(
    toRaw(currentUser),
    toRaw(initCurrentUser.value)
  );

  await useUpdate.updateUser({ id: currentUser.id, ...newUser });
}

watch(
  () => useUpdate.ec,
  async (n, o) => {
    if (n == 0) {
      await store.getAllUser();
      toast.success(useUpdate.isError);
      isOpenModalUpdate.value = false;
      useUpdate.$reset();
    } else if (n == 1) {
      toast.error(useUpdate.isError);
      useUpdate.$reset();
    } else {
      useUpdate.$reset();
    }
  }
);
const limit = ref<number>(5);
const currentPage = ref<number>(0);
provide("hanlderSubmitUpdate", hanlderSubmitUpdate);
function getCurrentPage(page: number) {
  currentPage.value = page;
}
watch(
  () => currentPage.value,
  async (n, o) => {
    await store.getAllUser(currentPage.value - 1, limit.value);
  }
);
provide("getCurrentPage", getCurrentPage);
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
      <Table
        :data="toRaw(store.listUsers)"
        @click-button="hanlderClickUpdate"
      />
    </div>
    <div>
      <ModalUpdate v-model:isOpenModalUpdate="isOpenModalUpdate" />
    </div>
  </div>
</template>

<style scoped></style>
