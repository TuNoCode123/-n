import {
  Iattribute,
  IchildProduct,
  IdescriptionProduct,
  IimageProduct,
  Iproduct,
  Ishop,
  Iuser,
} from "@/interface/user";
import productService from "@/services/product-service";
import userService from "@/services/user-service";
import { defineStore } from "pinia";
interface useCreateProduct {
  isLoading: boolean;
  isEC: number;
  isEM: string;
  isLoadingGetAll: boolean;
  listProducts?: Iproduct[];
  countProducts?: number;
}
export const useCreateProduct = defineStore("useCreateProduct", {
  // State: nơi định nghĩa các trạng thái cần lưu trữ
  state: (): useCreateProduct => ({
    isLoading: false,
    isEC: 99,
    isEM: "",
    isLoadingGetAll: false,
  }),
  actions: {
    async createProduct(product: Iproduct[], shopId: number) {
      try {
        this.isLoading = true;
        const res = await productService.createProduct(product, shopId);
        this.isLoading = false;
        this.isEC = res.EC;
        this.isEM = res.EM;
      } catch (error) {
        console.log(error);
        this.isLoading = true;
        this.isEM = "error";
      }
    },
    async getAllProduct(limit?: number, limitPage?: number, shopId?: number) {
      try {
        this.isLoadingGetAll = true;
        const res: any = await productService.getAllProduct(
          limit,
          limitPage,
          shopId
        );
        this.isLoadingGetAll = false;
        this.listProducts = res?.data?.rows;
        this.countProducts = res?.data?.count;
      } catch (error) {
        console.log(error);
        this.isLoadingGetAll = false;
      }
    },
  },
});

interface IuseDeleteProductStore {
  isLoading: boolean;
  isEc: number;
  isEM: string;
  listProduct?: Iproduct;
  listAttribute?: Iattribute[];
  listImageProduct?: IimageProduct[];
  selectedProduct?: IimageProduct;
  listChildsProduct?: IchildProduct[];
  shop?: Ishop;
}
export const useDeleteProductStore = defineStore("useDeleteProductStore", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async deleleProduct(id: number) {
      try {
        this.isLoading = true;
        const res = await productService.deleteProduct(id);
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

export const useGetProductById = defineStore("useGetProductById", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async getProductById(id: number) {
      try {
        this.isLoading = true;
        const res = await productService.getProductById(id);
        this.isLoading = false;
        this.isEc = res.EC;
        this.isEM = res.EM;
        this.listProduct = res.data;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.isEc = 99;
        this.isEM = "error pinia";
      }
    },
    reset() {
      this.isEc = 99;
    },
  },
});

export const addImageIntoProduct = defineStore("addImageIntoProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async addImage(files: File[], productId: number) {
      try {
        this.isLoading = true;
        const res = await productService.addImageIntoProduct(files, productId);
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
    reset() {
      this.isEc = 99;
    },
  },
});

export const addDescriptionIntoProduct = defineStore(
  "addDescriptionIntoProduct",
  {
    state: (): IuseDeleteProductStore => ({
      isLoading: false,
      isEc: 99,
      isEM: "",
    }),
    actions: {
      async addDescription(description: IdescriptionProduct) {
        try {
          this.isLoading = true;
          const res = await productService.addDescriptionIntoProduct(
            description
          );
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
      reset() {
        this.isEc = 99;
      },
    },
  }
);

export const addAttributeIntoProduct = defineStore("addAttributeIntoProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async addAttribute(attribute: Iattribute[]) {
      try {
        this.isLoading = true;
        const res = await productService.addAttributeIntoProduct(attribute);
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
    reset() {
      this.isEc = 99;
    },
  },
});

export const getAttributeOfProduct = defineStore("getAttributeOfProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async getAttribute(id: number) {
      try {
        this.isLoading = true;
        const res = await productService.getAttributeOfProduct(id);
        this.isLoading = false;
        this.isEc = res.EC;
        this.isEM = res.EM;
        this.listAttribute = res.data?.res;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.isEc = 99;
        this.isEM = "error pinia";
      }
    },
    reset() {
      this.isEc = 99;
    },
  },
});

export const deleteAttributeOfProduct = defineStore(
  "deleteAttributeOfProduct",
  {
    state: (): IuseDeleteProductStore => ({
      isLoading: false,
      isEc: 99,
      isEM: "",
    }),
    actions: {
      async deleteAttribute(id: number, productId: number) {
        try {
          this.isLoading = true;
          const res = await productService.deleteAttributeOfProduct(
            id,
            productId
          );
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
      reset() {
        this.isEc = 99;
      },
    },
  }
);

export const updateAttributeOfProduct = defineStore(
  "updateAttributeOfProduct",
  {
    state: (): IuseDeleteProductStore => ({
      isLoading: false,
      isEc: 99,
      isEM: "",
    }),
    actions: {
      async updateAttribute(att: Partial<Iattribute>) {
        try {
          this.isLoading = true;
          const res = await productService.updateAttributeOfProduct(att);
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
      reset() {
        this.isEc = 99;
      },
    },
  }
);

export const updateProduct = defineStore("updateProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async updateProduct(product: Iproduct) {
      try {
        this.isLoading = true;
        const res = await productService.updateProduct(product);
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
    reset() {
      this.isEc = 99;
    },
  },
});

export const getImageOfProduct = defineStore("getImageOfProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async getImage(id: number) {
      try {
        this.isLoading = true;
        const res = await productService.getImageOfProduct(id);
        this.isLoading = false;
        this.isEc = res.EC;
        this.isEM = res.EM;
        this.listImageProduct =
          res.data && res.data.res && res.data.res.length ? res.data.res : [];
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.isEc = 99;
        this.isEM = "error pinia";
      }
    },
    reset() {
      this.isEc = 99;
    },
  },
});

export const deleteImageOfProduct = defineStore("deleteImageOfProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async deleteImage(id: number, productId: number) {
      try {
        this.isLoading = true;
        const res = await productService.deleteImageOfProduct(id, productId);
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
    reset() {
      this.isEc = 99;
    },
  },
});

export const addChildProduct = defineStore("addChildProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async addchildProducts(product: IchildProduct[]) {
      try {
        this.isLoading = true;
        const res = await productService.addChildProduct(product);
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
    reset() {
      this.isEc = 99;
    },
  },
});

export const getAllProductChilds = defineStore("getAllProductChilds", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async getChildOfProduct(productId: number) {
      try {
        this.isLoading = true;
        const res = await productService.getAllProductChild(productId);
        this.isLoading = false;
        this.isEc = res.EC;
        this.isEM = res.EM;
        this.listChildsProduct = res.data;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.isEc = 99;
        this.isEM = "error pinia";
      }
    },
    reset() {
      this.isEc = 99;
    },
  },
});

export const deleteChildProduct = defineStore("deleteChildProduct", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async deleteChild(id: number, productId: number) {
      try {
        this.isLoading = true;
        const res = await productService.deleteChildProduct(id, productId);
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
    reset() {
      this.isEc = 99;
    },
  },
});

export const createShopProduct = defineStore("createShop", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async createNewShop(shop: Partial<Ishop>) {
      try {
        this.isLoading = true;
        const res = await productService.createNewShop(shop);
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
    reset() {
      this.isEc = 99;
    },
  },
});
export const findExistedShop = defineStore("findExistedShop", {
  state: (): IuseDeleteProductStore => ({
    isLoading: false,
    isEc: 99,
    isEM: "",
  }),
  actions: {
    async findShop(userId: number) {
      try {
        this.isLoading = true;
        const res = await productService.findShop(userId);
        this.isLoading = false;
        this.isEc = res.EC;
        this.isEM = res.EM;
        this.shop = res.data;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.isEc = 99;
        this.isEM = "error pinia";
      }
    },
    reset() {
      this.isEc = 99;
    },
  },
});
