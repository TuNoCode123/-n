import { defineStore } from "pinia";
import userService from "../services/user-service";
import { IallCode } from "../interface/allcode";
import { Iuser } from "../interface/user";

interface userState {
  isLoading: boolean;
  error: string;
  allcodes?: IallCode[];
  roleId?: IallCode[];
  newUser?: Iuser;
  isLoadingAddUser: boolean;
  errorAddUser: string;
  ecAddUser?: number;
  listUsers?: Iuser[];
  isLoadingGetAllUser: boolean;
  isLoadingDelUser: boolean;
  messageDelUser: string;
  ecDelUser?: number;
}
export const useUserStore = defineStore("myStore", {
  // State: nơi định nghĩa các trạng thái cần lưu trữ
  state: (): userState => ({
    isLoading: false,
    error: "",
    isLoadingAddUser: false,
    errorAddUser: "",
    isLoadingGetAllUser: false,
    listUsers: undefined,
    isLoadingDelUser: false,
    messageDelUser: "",
  }),

  // Getters: giống như computed, giúp tính toán các giá trị từ state
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },

  // Actions: nơi khai báo các phương thức để thay đổi state
  actions: {
    async getType(type: string) {
      try {
        this.isLoading = true;
        const response = await userService.getType(type);

        this.isLoading = false;
        this.allcodes = response.data;
      } catch (error) {
        if (error instanceof Error) {
          this.isLoading = false;
          this.error = error.message;
        }
      }
    },
    async getRoleId(type: string) {
      try {
        const response = await userService.getType(type);
        this.roleId = response.data;
      } catch (error) {
        if (error instanceof Error) {
          console.log("error at pinia ", error.message);
        }
      }
    },
    async addUser(user: Iuser) {
      try {
        this.isLoadingAddUser = true;
        const res = await userService.addUser(user);
        if (res.EC == 0) {
          this.newUser = res.data;
          this.isLoadingAddUser = false;
          this.errorAddUser = res.EM;
          this.ecAddUser = res.EC;
        } else {
          this.isLoadingAddUser = false;
          this.errorAddUser = res.EM;
          this.ecAddUser = res.EC;
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log("error at pinia ", error.message);
          this.isLoadingAddUser = false;
          this.errorAddUser = error.message;
          this.ecAddUser = 1;
        }
      }
    },
    async getAllUser() {
      try {
        this.isLoadingGetAllUser = true;
        const res = await userService.getAllUser();
        this.listUsers = res.data;
        this.isLoadingGetAllUser = false;
      } catch (error) {
        if (error instanceof Error) {
          console.log("error at pinia ", error.message);
          this.isLoadingGetAllUser = false;
        }
      }
    },
    async delUser(id: any) {
      try {
        this.isLoadingDelUser = true;
        const res = await userService.delUser(id);
        this.isLoadingDelUser = false;
        this.messageDelUser = res.EM;
        this.ecDelUser = res.EC;
      } catch (error) {
        if (error instanceof Error) {
          console.log("error at pinia ", error.message);
          this.ecDelUser = 1;
          this.isLoadingDelUser = false;
        }
      }
    },
  },
});
