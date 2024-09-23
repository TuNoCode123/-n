import { Icategory, Iouput } from "@/interface/user";
import instance from "../util/customAxios";

class ServiceCategory {
  public getAllCategory = async (
    limit?: number,
    limitPage?: number
  ): Promise<Iouput<Icategory[]>> => {
    try {
      return await instance.get(
        `get-all-category?page=${limit}&limitPage=${limitPage}`
      );
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public creatCategory = async (
    cate: Partial<Icategory>
  ): Promise<Iouput<number>> => {
    try {
      const form = new FormData();
      if (cate && cate.nameEn) form.append("nameEn", cate.nameEn);
      if (cate && cate.nameVi) form.append("nameVi", cate.nameVi);
      if (cate && cate.image) form.append("images", cate.image);
      if (cate && cate.parentId) form.append("parentId", cate.parentId);
      return await instance.post("create-category", form);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public updateCategory = async (
    cate: Partial<Icategory>
  ): Promise<Iouput<string>> => {
    try {
      const form = new FormData();
      if (cate && cate.id) form.append("id", cate.id);
      if (cate && cate.publicId) form.append("publicId", cate.publicId);
      if (cate && cate.nameEn) form.append("nameEn", cate.nameEn);
      if (cate && cate.nameVi) form.append("nameVi", cate.nameVi);
      if (cate && cate.image) form.append("images", cate.image);
      if (cate && cate.parentId) form.append("parentId", cate.parentId);
      return await instance.put("update-category", form);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public deleteCategory = async (id: number): Promise<Iouput<string>> => {
    try {
      return await instance.delete(`delete-category?id=${id}`);
    } catch (error) {
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
  public getAllCategoryNoPaginate = async (): Promise<Iouput<Icategory[]>> => {
    try {
      return await instance.get(`get-all-category-no-paginate`);
    } catch (error) {
      console.log(error);
      return {
        EC: 1,
        EM: "error",
      };
    }
  };
}
export default new ServiceCategory();
