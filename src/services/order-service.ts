import { IorderItems, Iouput } from "@/interface/user";
import instance from "@/util/customAxios";

class OrderService {
  public getAllOrderForShop = async (
    shopId: any
  ): Promise<Iouput<IorderItems[]>> => {
    try {
      return await instance.get(`get-all-order-for-shop?shopId=${shopId}`);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public changeOrderState = async (
    orderItemId: number,
    orderId: number,
    state: string,
    note: string,
    shopId: number,
    guess: any,
    stateVn: string,
    product: any
  ): Promise<Iouput<string>> => {
    try {
      return await instance.post(`transmiss-state-order`, {
        orderItemId,
        orderId,
        state,
        note,
        shopId,
        guess,
        stateVn,
        product,
      });
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
}
export default new OrderService();
