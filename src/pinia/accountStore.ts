import { Iuser } from "@/interface/user";
import userService from "@/services/user-service";
import { defineStore } from "pinia";
interface userState {
  inforUser: Iuser | undefined;
  err: string;
}
export const useAccountStore = defineStore("accountStore", {
  // State: nơi định nghĩa các trạng thái cần lưu trữ
  state: (): userState => ({
    inforUser: undefined,
    err: "",
  }),

  // Getters: giống như computed, giúp tính toán các giá trị từ state
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },

  // Actions: nơi khai báo các phương thức để thay đổi state
  actions: {
    async getAccount() {
      try {
        const res = await userService.getAccount();
        if (res == "timeout of 2000ms exceeded") {
          this.err = "err";
          return;
        }
        this.inforUser = JSON.parse(res?.data)?.data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
  },
});
