import { Icounpon } from "@/interface/user";
import couponService from "@/services/coupon-service";
import { format } from "date-fns";
import { defineStore } from "pinia";

interface IcreateCoupon {
  EC: number;
  EM: string;
  LOADING: Boolean;
}
export const createCoupon = defineStore("createCoupon", {
  state: (): IcreateCoupon => ({
    LOADING: false,
    EC: 99,
    EM: "",
  }),
  actions: {
    async createCouponWithData(coupon: Icounpon, submitDate: any) {
      try {
        this.LOADING = true;
        const res = await couponService.createCoupon(coupon, submitDate);
        this.EC = res.EC;
        this.EM = res.EM;
        this.LOADING = false;
      } catch (error) {
        this.LOADING = false;
      }
    },
  },
});
interface IgetAllCoupon {
  isLoading: boolean;
  listCoupon?: Icounpon[];
  count?: number;
  isEc: number;
}
export const getAllCoupon = defineStore("getAllCoupon", {
  state: (): IgetAllCoupon => ({
    isLoading: false,
    isEc: 99,
    count: 0,
    listCoupon: [],
  }),
  actions: {
    async getAllCoupons() {
      try {
        this.isLoading = true;
        const res = await couponService.getAllCoupon();
        this.isEc = res.EC;
        this.listCoupon = res.data?.rows;
        this.count = res.data?.count;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
});

export const deleteCoupon = defineStore("deleteCoupon", {
  state: (): IcreateCoupon => ({
    LOADING: false,
    EC: 99,
    EM: "",
  }),
  actions: {
    async delCoupon(id: number) {
      try {
        this.LOADING = true;
        const res = await couponService.deleteCoupon(id);
        this.EC = res.EC;
        this.EM = res.EM;
        this.LOADING = false;
      } catch (error) {
        this.LOADING = false;
      }
    },
  },
});

export const updateCoupon = defineStore("updateCoupon", {
  state: (): IcreateCoupon => ({
    LOADING: false,
    EC: 99,
    EM: "",
  }),
  actions: {
    async updateCouponWithData(counpon: Icounpon) {
      try {
        this.LOADING = true;
        counpon.dateTo = format(new Date(counpon.dateTo), "yyyy/MM/dd");
        const res = await couponService.updateCoupon(counpon);
        this.EC = res.EC;
        this.EM = res.EM;
        this.LOADING = false;
      } catch (error) {
        this.LOADING = false;
      }
    },
  },
});
