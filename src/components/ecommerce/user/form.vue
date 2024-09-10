<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRaw, toRefs, watch } from "vue";
import type { Iuser } from "../../../interface/user";
import Select from "../../shareComponent/select.vue";
// import { userStore } from "../../../pinia/userStore";
import { useUserStore } from "@/pinia/userStore";
import { convertFileIntoBase64 } from "../../../util/convert";
import { getFirstKeyMap } from "../../../util/computed";
import { VueSpinner } from "vue3-spinners";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const user = reactive<Iuser>({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  gender: "",
  image: "",
  roleId: "",
});
const store = useUserStore();

const gender = ref();
const roleId = ref();
const preImg = ref<any>("");

const initGender = getFirstKeyMap("allcodes");
const initRoleId = getFirstKeyMap("roleId");

gender.value = initGender.value;
roleId.value = initRoleId.value;

async function updateUser(event: Event, type: keyof Iuser) {
  if (type == "image") {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const fileImg = input.files[0] as File;
      const imgBase64 = await convertFileIntoBase64(fileImg);
      preImg.value = imgBase64;
      user[type] = fileImg;
    }

    return;
  }
  const input = event.target as HTMLInputElement;
  user[type] = input.value;
}
async function hanlderOnclick() {
  const rawUser = toRaw(user);
  const newUser = { ...rawUser, gender: gender.value, roleId: roleId.value };
  await store.addUser(newUser);
}
const error = store.errorAddUser;
// Theo dõi sự thay đổi của state
watch(
  () => store.errorAddUser,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      toast(newValue, { autoClose: 1000 });
    }
  }
);
watch(
  () => store.ecAddUser,
  async (newValue, oldValue) => {
    if (newValue == 0) {
      user.address = "";
      user.firstName = "";
      user.gender = initGender.value;
      user.lastName = "";
      user.roleId = initRoleId.value;
      user.image = "";
      user.password = "";
      user.email = "";
      user.phoneNumber = "";
      preImg.value = "";
      await store.getAllUser();
    }
  }
);
console.log(store.ecAddUser);
</script>

<template>
  <form class="w-full max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
      <input
        type="email"
        name="floating_email"
        id="floating_email"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        :value="user.email"
        @input="(e) => updateUser(e, 'email')"
        required
      />
      <label
        for="floating_email"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Email address
      </label>
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_first_name"
          id="floating_first_name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          :value="user.firstName"
          @input="(e) => updateUser(e, 'firstName')"
        />
        <label
          for="floating_first_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >First name</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_last_name"
          id="floating_last_name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          :value="user.lastName"
          @input="(e) => updateUser(e, 'lastName')"
          required
        />
        <label
          for="floating_last_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Last name</label
        >
      </div>
    </div>
    <div class="grid md:grid-cols-3 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          :value="user.password"
          @input="(e) => updateUser(e, 'password')"
          required
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_repeat_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Confirm password</label
        >
      </div>
      <div class="relative z-0 w-full mb-5">
        <Select
          :listItem="toRaw(store.roleId)"
          v-model:gender="roleId"
          type="role"
        />
      </div>
    </div>

    <div class="grid md:grid-cols-3 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="floating_phone"
          id="floating_phone"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          :value="user.phoneNumber"
          @input="(e) => updateUser(e, 'phoneNumber')"
        />
        <label
          for="floating_phone"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Phone number</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_company"
          id="floating_company"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          :value="user.address"
          @input="(e) => updateUser(e, 'address')"
          required
        />
        <label
          for="floating_company"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Address</label
        >
      </div>
      <div class="relative z-0 w-full mb-5">
        <Select
          :listItem="toRaw(store.allcodes)"
          v-model:gender="gender"
          type="gender"
        />
      </div>
    </div>
    <div>
      <label for="img"></label>
      <input
        type="file"
        name="img"
        id="img"
        @input="(e) => updateUser(e, 'image')"
        hidden
      />
    </div>
    <div class="w-40 h-14 mx-auto">
      <label
        class="flex justify-center items-center text-gray-400 text-sm w-full h-full mx-auto border-dashed border-2 border-zinc-600"
        for="img"
      >
        <div v-if="preImg" class="w-9/12 h-full mx-auto">
          <img :src="preImg" class="w-full h-full object-contain" />
        </div>
        <span v-else>Select Img</span>
      </label>
    </div>
    <VueSpinner
      v-if="store.isLoadingAddUser"
      size="45"
      color="rgb(93, 197, 150)"
    />
    <button
      v-else
      type="button"
      @click="hanlderOnclick"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>
</template>

<style scoped></style>
