<script setup lang="ts">
import { Label } from "@/components/ui/label";

import Minus from "@/components/SvgComponent/minus.vue";
import Plus from "@/components/SvgComponent/plus.vue";
import { computed, reactive, ref, toRaw, watch } from "vue";
import { Iinventory, Iproduct } from "@/interface/user";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Button from "@/components/ui/button/Button.vue";
import { useCategoryStore } from "@/pinia/categoryStore";
import SelectCategoryForProduct from "./selectCategoryForProduct.vue";
import { findExistedShop, useCreateProduct } from "@/pinia/productStore";
import { toast } from "vue3-toastify";

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
const product = reactive<Iproduct[]>([
  {
    uuid: uuidv4(),
    nameVi: "",
    nameEn: "",
    price: "",
    branch: "",
    categoryId: "",
    totalPrices: "",
    quantity: 0,
  },
]);

function hanlerClickOnPlus() {
  const Temp_product: Iproduct = {
    uuid: uuidv4(),
    nameVi: "",
    nameEn: "",
    price: "",
    branch: "",
    categoryId: "",
    quantity: 0,
  };
  product.push(Temp_product);
}
function hanlerClickOnMinus(id: any) {
  const tempProduct = _.cloneDeep(product);
  const restProduct = tempProduct.filter((item) => item.uuid != id);
  product.length = 0;
  product.push(...restProduct);
}
function updateProduct(
  event: Event | null,
  uuid: any,
  type: keyof Iproduct,
  id?: number
) {
  const tempProduct = _.cloneDeep(product);
  const chooseProduct = tempProduct.find((item) => item.uuid == uuid);
  if (!chooseProduct) return;
  const indexChooseProduct = tempProduct.findIndex((item) => item.uuid == uuid);
  if (id || event == null) {
    chooseProduct[type] = id;
    tempProduct[indexChooseProduct] = chooseProduct;
    product.length = 0;
    product.push(...tempProduct);
  } else {
    const input = event.target as HTMLInputElement;
    chooseProduct[type] = input.value;
    if (type == "price") {
      chooseProduct["totalPrices"] = input.value;
    }
    tempProduct[indexChooseProduct] = chooseProduct;
    product.length = 0;
    product.push(...tempProduct);
  }
}
const useProduct = useCreateProduct();
const shop = findExistedShop();
async function hanlderOnclickSubmit() {
  if (!shop || !shop.shop) return;
  await useProduct.createProduct(product, shop.shop?.id);
}

const categoryStore = useCategoryStore();
const shops = findExistedShop();
watch(
  () => useProduct.isEC,
  async (n, o) => {
    if (n == 0) {
      toast.success(useProduct.isEM);
      product.length = 0;
      product.push(
        ...[
          {
            uuid: uuidv4(),
            nameVi: "",
            nameEn: "",
            price: "",
            branch: "",
            categoryId: "",
            quantity: 0,
          },
        ]
      );
      await useProduct.getAllProduct(undefined, undefined, shops.shop?.id);
      useProduct.$reset();
    } else if (n == 1) {
      toast.error(useProduct.isEM);
      useProduct.$reset();
    } else {
      useProduct.$reset();
    }
  }
);

const listItem = computed(() =>
  categoryStore.listCategoryNoPaginate
    ? toRaw(categoryStore.listCategoryNoPaginate)
    : undefined
);
</script>

<template>
  <div
    v-for="(item, index) in product"
    :key="item.uuid"
    class="w-4/5 p-2 bg-colorProduct flex items-center gap-5 mb-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
  >
    <div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label>Tên</Label>
          <input
            id="email"
            type="text"
            class="outline-none h-10 p-2 border-2 rounded-sm"
            placeholder="Nhập Tên Của Sản Phẩm"
            :value="item.nameVi"
            @input="(e:Event) => updateProduct(e,item.uuid, 'nameVi')"
          />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label>Name</Label>
          <input
            id="name"
            class="outline-none h-10 p-2 border-2 rounded-sm"
            type="text"
            placeholder="Enter name of product"
            :value="item.nameEn"
            @input="(e:Event) => updateProduct(e,item.uuid, 'nameEn')"
          />
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6 mt-3">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label>Price</Label>
          <input
            id="price"
            class="outline-none h-10 p-2 border-2 rounded-sm"
            type="text"
            placeholder="Nhập Giá"
            :value="item.price"
            @input="(e:Event) => updateProduct(e,item.uuid, 'price')"
          />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label>Branch</Label>
          <input
            id="branch"
            class="outline-none h-10 p-2 border-2 rounded-sm"
            type="text"
            placeholder="Nhập Branch"
            :value="item.branch"
            @input="(e:Event) => updateProduct(e,item.uuid, 'branch')"
          />
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6 mt-3">
        <div class="relative z-0 w-full mb-5">
          <SelectCategoryForProduct
            :listItemCategory="listItem"
            @updateProduct="updateProduct"
            :uuid="item.uuid"
          />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label>Số Lượng</Label>
          <input
            id="quantity"
            class="outline-none h-10 p-2 border-2 rounded-sm"
            type="text"
            placeholder="Nhập Số Lượng"
            :value="item.quantity"
            @input="(e:Event) => updateProduct(e,item.uuid, 'quantity')"
          />
        </div>
      </div>
    </div>
    <div class="flex gap-2">
      <Plus @click="hanlerClickOnPlus" class="cursor-pointer" />
      <Minus
        v-if="product.length > 1"
        @click="() => hanlerClickOnMinus(item.uuid)"
        class="cursor-pointer"
      />
    </div>
  </div>
  <div>
    <Button @click="hanlderOnclickSubmit">Submit</Button>
  </div>
</template>

<style scoped></style>
