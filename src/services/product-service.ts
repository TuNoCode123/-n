import {
  IallAttributeProduct,
  Iattribute,
  Icategory,
  IdescriptionProduct,
  IimageProduct,
  Iouput,
  Iproduct,
} from "@/interface/user";
import instance from "../util/customAxios";

class ServiceProduct {
  public createProduct = async (product: Iproduct[]): Promise<Iouput<any>> => {
    try {
      return await instance.post("add-product", { data: product });
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public getAllProduct = async (
    limit?: number,
    limitPage?: number
  ): Promise<Iouput<Iproduct[]>> => {
    try {
      return await instance.get(
        `get-all-product?page=${limit}&limitPage=${limitPage}`
      );
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public deleteProduct = async (id: number): Promise<Iouput<string>> => {
    try {
      return await instance.delete(`delete-product-by-id?id=${id}`);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public getProductById = async (id: number): Promise<Iouput<Iproduct>> => {
    try {
      return await instance.get(`get-product-by-id?id=${id}`);
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public addImageIntoProduct = async (
    files: File[],
    productId: any
  ): Promise<Iouput<string>> => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      if (productId) {
        formData.append("productId", productId);
      }
      formData.append("type", "addImageProduct");
      return await instance.post("add-images-into-product", formData);
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public addDescriptionIntoProduct = async (
    description: IdescriptionProduct
  ): Promise<Iouput<string>> => {
    try {
      return await instance.post("add-description-into-product", description);
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public addAttributeIntoProduct = async (
    attribute: Iattribute[]
  ): Promise<Iouput<string>> => {
    try {
      return await instance.post("add-attri-into-pro", {
        attribute,
      });
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public getAttributeOfProduct = async (
    id: any
  ): Promise<Iouput<IallAttributeProduct<Iattribute[]>>> => {
    try {
      return await instance.get(`get-attributes-of-product?id=${id}`);
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public deleteAttributeOfProduct = async (
    id: number,
    productId: number
  ): Promise<Iouput<string>> => {
    try {
      return await instance.delete(
        `delete-attribute?id=${id}&productId=${productId}`
      );
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public updateAttributeOfProduct = async (
    att: Partial<Iattribute>
  ): Promise<Iouput<string>> => {
    try {
      return await instance.put(`update-attribute`, { att });
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public updateProduct = (product: Iproduct): Promise<Iouput<string>> => {
    try {
      return instance.put("update-product", product);
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };

  public getImageOfProduct = async (
    id: any
  ): Promise<Iouput<IallAttributeProduct<IimageProduct[]>>> => {
    try {
      return await instance.get(`get-image-of-product?id=${id}`);
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };

  public deleteImageOfProduct = async (
    id: number,
    productId: number
  ): Promise<Iouput<string>> => {
    try {
      return await instance.delete(
        `delete-image?id=${id}&productId=${productId}`
      );
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
}
export default new ServiceProduct();
