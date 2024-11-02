import { IorderItems } from "@/interface/user";
import orderService from "@/services/order-service";
import { defineStore } from "pinia";
interface IorderStore {
  isLoadingGetallOrderForShop: boolean;
  ecGetAllOrderForShop: number;
  emGetAllOrderForShop: string;
  listOrderItems?: IorderItems[];
}
export const getAllOrderForShop = defineStore("getAllOrderForShop", {
  state: (): IorderStore => ({
    isLoadingGetallOrderForShop: false,
    ecGetAllOrderForShop: 99,
    emGetAllOrderForShop: "",
  }),
  actions: {
    async getAllOrderForShop(shopId: any) {
      try {
        this.isLoadingGetallOrderForShop = true;
        const res = await orderService.getAllOrderForShop(shopId);
        this.isLoadingGetallOrderForShop = false;
        this.ecGetAllOrderForShop = res.EC;
        this.emGetAllOrderForShop = res.EM;
        this.listOrderItems = res.data;
      } catch (error) {
        this.isLoadingGetallOrderForShop = false;
      }
    },
  },
});

interface IchangeOrderState {
  ec: number;
  em: string;
  loading: boolean;
}
export const changeOrderStateForShop = defineStore("changeOrderStateForShop", {
  state: (): IchangeOrderState => ({
    loading: false,
    ec: 99,
    em: "",
  }),
  actions: {
    async changeState(
      orderItemId: number,
      orderId: number,
      state: string,
      note: string,
      shopId: number,
      guess: any,
      stateVn: string,
      product: any
    ) {
      try {
        this.loading = true;
        const res = await orderService.changeOrderState(
          orderItemId,
          orderId,
          state,
          note,
          shopId,
          guess,
          stateVn,
          product
        );
        this.loading = false;
        this.ec = res.EC;
        this.em = res.EM;
      } catch (error) {
        this.loading = false;
      }
    },
  },
});
