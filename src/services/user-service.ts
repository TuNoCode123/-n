import axios from "axios";
import { IallCode } from "../interface/allcode";
import { Iouput, Iuser } from "../interface/user";
import instance from "../util/customAxios";

class ServiceUser {
  public getType = async (type: any): Promise<Iouput<IallCode[]>> => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/get-allcode?type=${type}`
      );
      return res && res.data ? res.data : res;
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public addUser = async (user: Iuser): Promise<Iouput<Iuser>> => {
    try {
      const form = new FormData();
      if (user && user.email) form.append("email", user.email);
      if (user && user.password) form.append("passWord", user.password);
      if (user && user.firstName) form.append("firstName", user.firstName);
      if (user && user.lastName) form.append("lastName", user.lastName);
      if (user && user.address) form.append("address", user.address);
      if (user && user.phoneNumber)
        form.append("phoneNumber", user.phoneNumber);
      if (user && user.gender) form.append("gender", user.gender);
      if (user && user.roleId) form.append("roleId", user.roleId);
      if (user && user.image) form.append("images", user.image);

      return await instance.post("adduser", form);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };

  public getAccount = async (): Promise<any> => {
    try {
      const res: any = await axios.get(
        "http://localhost:8000/api/v1/get-account",
        {
          withCredentials: true,
          timeout: 2000,
        }
      );

      return res;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return error.message;
      }
      return "err";
    }
  };
  public getAllUser = async (
    page?: number,
    limitPage?: number
  ): Promise<Iouput<Iuser[]>> => {
    try {
      return await instance.get(
        `get-all-users?page=${page}&limitPage=${limitPage}`
      );
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public delUser = async (id: any): Promise<Iouput<Iuser[]>> => {
    try {
      return await instance.get(`del-user-by-id?id=${id}`);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public updateUser = async (user: Partial<Iuser>): Promise<Iouput<string>> => {
    try {
      const form = new FormData();
      if (user && user.id) form.append("id", user.id);
      if (user && user.email) form.append("email", user.email);
      if (user && user.password) form.append("passWord", user.password);
      if (user && user.firstName) form.append("firstName", user.firstName);
      if (user && user.lastName) form.append("lastName", user.lastName);
      if (user && user.address) form.append("address", user.address);
      if (user && user.phoneNumber)
        form.append("phoneNumber", user.phoneNumber);
      if (user && user.gender) form.append("gender", user.gender);
      if (user && user.roleId) form.append("roleId", user.roleId);
      if (user && user.image) form.append("images", user.image);
      return await instance.put("update-user", form);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
}
export default new ServiceUser();
