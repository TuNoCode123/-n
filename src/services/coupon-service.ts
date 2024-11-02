import { Icounpon, IdataCoupon, Iouput } from "@/interface/user";
import instance from "@/util/customAxios";

class CouponService {
  public createCoupon = async (
    cp: Icounpon,
    submitDate: string
  ): Promise<Iouput<Icounpon>> => {
    try {
      return await instance.post("create-coupon", {
        coupon: cp,
        submitDate,
      });
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public getAllCoupon = async (): Promise<Iouput<IdataCoupon<Icounpon[]>>> => {
    try {
      return await instance.get("get-all-counpon");
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public deleteCoupon = async (id: number): Promise<Iouput<string>> => {
    try {
      return await instance.delete(`delete-coupon?id=${id}`);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public updateCoupon = async (counpon: Icounpon): Promise<Iouput<string>> => {
    try {
      return await instance.put(`update-coupon`, counpon);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
}
export default new CouponService();
