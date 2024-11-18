import instanceChat from "@/util/axiosForChat";
import { Imess, Iouput, IoutputGetMess, Ishop, Iuser } from "../interface/user";

class ServiceChat {
  public createRoom = async (
    userId: number,
    shopId: number
  ): Promise<Iouput<string>> => {
    try {
      return await instanceChat.get(
        `create-room?userId=${userId}&shopId=${shopId}`
      );
    } catch (error) {
      return {
        EC: 1,
        EM: "ERROR",
      };
    }
  };
  public getListUserChatById = async (
    userId: number
  ): Promise<Iouput<Iuser[]>> => {
    try {
      return await instanceChat.get(`get-chat-by-id?id=${userId}`);
    } catch (error) {
      return {
        EC: 1,
        EM: "ERROR",
      };
    }
  };

  public sendMessage = async (userId: number): Promise<Iouput<Ishop[]>> => {
    try {
      return await instanceChat.get(`get-chat-by-id?id=${userId}`);
    } catch (error) {
      return {
        EC: 1,
        EM: "ERROR",
      };
    }
  };
  public getAllMessage = async (
    userId: number,
    partnerId: number
  ): Promise<Iouput<IoutputGetMess>> => {
    try {
      return await instanceChat.get(
        `get-all-mess?userId=${userId}&partnerId=${partnerId}`
      );
    } catch (error) {
      return {
        EC: 1,
        EM: "ERROR",
      };
    }
  };

  public createMess = async ({
    senderId,
    text,
    roomId,
    image,
  }: {
    senderId: any;
    text: string;
    roomId: string;
    image: any;
  }): Promise<Iouput<Imess>> => {
    try {
      const form = new FormData();
      if (senderId) form.append("senderId", senderId);
      if (text) form.append("text", text);
      if (roomId) form.append("roomId", roomId);
      if (image) form.append("images", image);
      return instanceChat.post("create-mess", form);
    } catch (error) {
      return {
        EC: 1,
        EM: "ERROR",
      };
    }
  };

  public updateMess = async ({
    senderId,
    text,
    roomId,
    _id,
    type,
  }: {
    senderId: any;
    text: string;
    roomId: string;
    _id: any;
    type?: string;
  }): Promise<Iouput<Imess>> => {
    try {
      return instanceChat.put("update-message", {
        senderId,
        text,
        roomId,
        _id,
        type,
      });
    } catch (error) {
      return {
        EC: 1,
        EM: "ERROR",
      };
    }
  };
}
export default new ServiceChat();
