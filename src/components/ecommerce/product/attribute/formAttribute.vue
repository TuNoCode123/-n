<script setup lang="ts">
import { Label } from "@/components/ui/label";
import _ from "lodash";
import Popover from "@/components/shareComponent/popover.vue";
import { inject, toRaw } from "vue";
import { Iproduct } from "@/interface/user";
import { getPercent } from "@/util/getPercent";

// async function onChangeInputCategory(event: Event, type: keyof Icategory) {
//   if (type == "image") {
//     const input = event.target as HTMLInputElement;
//     if (input && input.files && input.files.length > 0) {
//       const fileImg = input.files[0] as File;
//       const imgBase64 = await convertFileIntoBase64(fileImg);
//       preImg.value = imgBase64;
//       inforCate[type] = fileImg;
//     }

//     return;
//   }
//   const input = event.target as HTMLInputElement;
//   inforCate[type] = input.value;
// }
// const product = reactive<Iproduct[]>([
//   {
//     uuid: uuidv4(),
//     nameVi: "",
//     nameEn: "",
//     price: "",
//     branch: "",
//     categoryId: "",
//   },
// ]);

const product = inject("productLIst");

function updateProduct(event: Event, type: keyof Iproduct) {
  const input = event.target as HTMLInputElement;
  product.value[type] = input.value;
  if (type == "discount") {
    const percentDiscount = getPercent(+input.value);
    product.value["totalPrices"] =
      product.value["price"] - percentDiscount * product.value["price"];
  }
}
</script>

<template>
  <div
    class="w-full p-2 rounded-sm bg-colorProduct flex items-center gap-5 mb-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
  >
    <div class="w-full">
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label class="flex justify-between"
          >Tên
          <Popover
            :name="product?.nameVi"
            type="nameVi"
            @updateProduct="updateProduct"
        /></Label>
        <input
          id="email"
          type="text"
          class="outline-none h-10 p-2 border-2 rounded-sm"
          placeholder="Nhập Tên Của Sản Phẩm"
          :value="product?.nameVi"
          @input="(e) => updateProduct(e, 'nameVi')"
        />
      </div>

      <div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label class="flex justify-between"
          >Name
          <Popover
            :name="product?.nameEn"
            type="nameEn"
            @updateProduct="updateProduct"
        /></Label>
        <input
          id="name"
          class="outline-none h-10 p-2 border-2 rounded-sm"
          type="text"
          placeholder="Enter name of product"
          :value="product?.nameEn"
          @input="(e) => updateProduct(e, 'nameEn')"
        />
      </div>

      <div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label>Price</Label>
        <input
          id="price"
          class="outline-none h-10 p-2 border-2 rounded-sm"
          type="text"
          placeholder="Nhập Giá"
          :value="product?.price"
          @input="(e) => updateProduct(e, 'price')"
        />
      </div>

      <div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label>Discount</Label>
        <input
          id="percent"
          class="outline-none h-10 p-2 border-2 rounded-sm"
          type="text"
          placeholder="Nhập giảm giá"
          :value="product?.discount"
          @input="(e) => updateProduct(e, 'discount')"
        />
      </div>

      <div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label>Branch</Label>
        <input
          id="branch"
          class="outline-none h-10 p-2 border-2 rounded-sm"
          type="text"
          placeholder="Nhập Branch"
          :value="product?.branch"
          @input="(e:Event) => updateProduct(e, 'branch')"
        />
      </div>

      <div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label>Total Price</Label>
        <input
          id="stars"
          class="outline-none h-10 p-2 border-2 rounded-sm"
          type="text"
          :value="product?.totalPrices ? product?.totalPrices : 0"
          disabled
        />
      </div>

      <!-- <div class="grid md:grid-cols-1 md:gap-6 mt-3">
        <div class="relative z-0 w-full mb-5">
          <SelectCategoryForProduct
            :listItemCategory="listItem"
            @updateProduct="updateProduct"
            :uuid="item.uuid"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
