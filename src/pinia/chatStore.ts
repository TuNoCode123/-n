import { Imess, Inotification, Iuser } from "@/interface/user";
import chatService from "@/services/chatService";
import { defineStore } from "pinia";

interface IchatStore {
  isLoadingGetListPartner: boolean;
  listPartner?: Iuser[];
  roomId?: string;
  listMessages?: Imess[];
  isLoadingGetAllMess: boolean;
  isEcAddMessages?: number;
  isEmAddMessages?: string;
  isLoadingAddMess: boolean;
  newMessages?: Imess;

  isEcUpdateMessage?: number;
  isEmUpdateMessage?: string;
  isLoadingUpdateMessage: boolean;
  notification: Inotification[];

  isEcCreateRoom?: number;
  isEmCreateRoom?: string;
  isLoadingCreateRoom: boolean;
}
export const useChatStore = defineStore("useChatStore", {
  state: (): IchatStore => ({
    isLoadingGetListPartner: false,
    isLoadingGetAllMess: false,
    listPartner: [],
    listMessages: [],
    isLoadingAddMess: false,
    isLoadingUpdateMessage: false,
    notification: [],
    isLoadingCreateRoom: false,
  }),
  actions: {
    async getListPartner(userId: number) {
      try {
        this.isLoadingGetListPartner = true;
        const res = await chatService.getListUserChatById(userId);
        this.isLoadingGetListPartner = false;
        this.listPartner = res.data;
      } catch (error) {
        console.log(error);
        this.isLoadingGetListPartner = false;
      }
    },
    async getAllMessages(userId: number, partnerId: number) {
      try {
        this.isLoadingGetAllMess = true;
        const res = await chatService.getAllMessage(userId, partnerId);
        this.isLoadingGetAllMess = false;
        this.roomId = res.data?.roomId;
        this.listMessages = res.data?.messages;
      } catch (error) {
        console.log(error);
        this.isLoadingGetAllMess = false;
      }
    },
    async addmess(senderId: number, text: string, roomId: string, image?: any) {
      try {
        this.isLoadingAddMess = true;
        const res = await chatService.createMess({
          senderId,
          text,
          roomId,
          image,
        });
        this.isLoadingAddMess = false;
        this.isEcAddMessages = res.EC;
        this.isEmAddMessages = res.EM;
        this.newMessages = res.data;
      } catch (error) {
        console.log(error);
        this.isLoadingAddMess = false;
      }
    },
    async updateMessages(
      senderId: number,
      text: string,
      roomId: string,
      _id: any,
      type?: string
    ) {
      try {
        this.isLoadingUpdateMessage = true;
        const res = await chatService.updateMess({
          senderId,
          text,
          roomId,
          _id,
          type,
        });
        this.isLoadingUpdateMessage = false;
        this.isEcUpdateMessage = res.EC;
        this.isEmUpdateMessage = res.EM;
      } catch (error) {
        this.isLoadingUpdateMessage = false;
      }
    },
    async createRoom(userId: number, shopId: number) {
      try {
        this.isLoadingCreateRoom = true;
        const res = await chatService.createRoom(userId, shopId);
        this.isLoadingCreateRoom = false;
        this.isEcCreateRoom = res.EC;
        this.isEmCreateRoom = res.EM;
      } catch (error) {
        this.isLoadingCreateRoom = false;
      }
    },
    addNewMess(mess: Imess) {
      this.listMessages?.push(mess);
    },
    addNotification(not: Inotification[]) {
      this.notification = not;
    },
    resetiIsNewChat() {
      this.isEcAddMessages = -99;
      this.isEcUpdateMessage = -99;
      // this.isEcCreateRoom = -99;
    },
    updateMess(mess: Imess) {
      this.listMessages = this.listMessages?.map((l) => {
        if (l._id == mess._id) {
          return {
            ...l,
            text: mess.text,
            createdAt: mess.createdAt,
          };
        }
        return l;
      });
    },
  },
});
