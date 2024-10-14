import { Icategory, Iouput } from "@/interface/user";
import categoryService from "@/services/category-service";
import { create } from "lodash";
import { defineStore } from "pinia";
interface categoryState {
  isLoading: boolean;
  listCategory?: Iouput<Icategory[]>;
  isLoadingCreate: boolean;
  isEcCreate: number;
  isEmCreat: string;
  countCategory?: number;
  isLoadingNoPaginate: boolean;
  listCategoryNoPaginate?: Icategory[];
}
interface IuseCategoryStore {
  isLoading: boolean;
  isEc: number;
  isEM: string;
}

export const useCategoryStore = defineStore("categoryStore", {
  state: (): categoryState => ({
    isLoading: false,
    isLoadingCreate: false,
    isEcCreate: 99,
    isEmCreat: "",
    isLoadingNoPaginate: false,
  }),
  actions: {
    async getAllCategory(limit?: number, limitPage?: number) {
      try {
        this.isLoading = true;
        const res: any = await categoryService.getAllCategory(limit, limitPage);
        this.isLoading = false;
        this.listCategory = res?.data?.rows;
        this.countCategory = res?.data?.count;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async createCategory(cate: Partial<Icategory>) {
      try {
        this.isLoadingCreate = true;
        const res = await categoryService.creatCategory(cate);
        this.isLoadingCreate = false;
        this.isEcCreate = res.EC;
        this.isEmCreat = res.EM;
      } catch (error) {
        console.log(error);
        this.isEcCreate = 99;
        this.isEmCreat = "error pinia";
      }
    },
    async getAllCategoryNoPaginate(shopId?: number) {
      try {
        this.isLoadingNoPaginate = true;
        const res = await categoryService.getAllCategoryNoPaginate(shopId);
        this.isLoadingNoPaginate = false;
        this.listCategoryNoPaginate = res.data;
      } catch (error) {
        this.isLoadingNoPaginate = false;
        console.log(error);
      }
    },
  },
});

export const useUpdateCategoryStore = defineStore("useUpdateCategoryStore", {
  state: (): IuseCategoryStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async updateCategory(cate: Partial<Icategory>) {
      try {
        this.isLoading = true;
        const res = await categoryService.updateCategory(cate);
        this.isLoading = false;
        this.isEc = res.EC;
        this.isEM = res.EM;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.isEc = 99;
        this.isEM = "error pinia";
      }
    },
  },
});

export const useDeleteCategoryStore = defineStore("useDeleteCategoryStore", {
  state: (): IuseCategoryStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async deleleCategory(id: number) {
      try {
        this.isLoading = true;
        const res = await categoryService.deleteCategory(id);
        this.isLoading = false;
        this.isEc = res.EC;
        this.isEM = res.EM;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.isEc = 99;
        this.isEM = "error pinia";
      }
    },
  },
});
