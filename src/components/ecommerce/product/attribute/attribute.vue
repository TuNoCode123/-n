<script setup lang="ts">
import { Iattribute, IdescriptionProduct, Iproduct } from "@/interface/user";
import Select from "./select.vue";
import { provide, reactive, ref, toRaw, watch } from "vue";
import SelectProduct from "./selectProduct.vue";
import {
  addAttributeIntoProduct,
  addChildProduct,
  addDescriptionIntoProduct,
  addImageIntoProduct,
  getAllProductChilds,
  getAttributeOfProduct,
  getImageOfProduct,
  updateAttributeOfProduct,
  updateProduct,
  useGetProductById,
} from "@/pinia/productStore";
import FormAttribute from "./formAttribute.vue";
import Button from "@/components/ui/button/Button.vue";
import InputImg, { IlistImage } from "./inputImg.vue";
import { v4 as uuidv4 } from "uuid";
import AccodianAttribute from "./accodianAttribute.vue";
import AddAttribute, { IattributeAdmin } from "./addAttribute.vue";
import PropoverSubmit from "./propoverSubmit.vue";
import { toast } from "vue3-toastify";
import AccodianListAttribute from "./accodianListAttribute.vue";
import _, { assign } from "lodash";
import ModalUpdateAttribute from "./modalUpdateAttribute.vue";
import { differentObject } from "@/util/relationShip";
import AccodianImageProduct from "./accodianImageProduct.vue";
import { Award } from "lucide-vue-next";
import ChildProduct from "./childProduct.vue";
import AccodianChildProduct from "./accodianChildProduct.vue";
const listProduct = ref<Iproduct[]>();
const toggle = ref(false);
function getProductOfCategory(product: Iproduct[] | undefined) {
  listProduct.value = product;
  toggle.value = !toggle.value;
}
const getProduct = useGetProductById();
const getImageStore = getImageOfProduct();
const idProduct = ref<number>(0);
const childStore = getAllProductChilds();

async function hanlderOnlickSelectProduct(id: number) {
  idProduct.value = id;
  await getProduct.getProductById(id);
  await Promise.all([
    productAttributeStore.getAttribute(id),
    getImageStore.getImage(id),
    childStore.getChildOfProduct(id),
  ]);
}
provide("productId", idProduct);
const selected =
  getImageStore.listImageProduct && getImageStore.listImageProduct.length > 0
    ? ref(getImageStore.listImageProduct[0])
    : ref(undefined);

watch(
  () => getImageStore.isEc,
  (n) => {
    if (n == 0) {
      selected.value =
        getImageStore.listImageProduct &&
        getImageStore.listImageProduct.length > 0
          ? getImageStore.listImageProduct[0]
          : undefined;
      const temp = {
        uuid: uuidv4(),
        k: "",
        v: "",
        publicId: "",
      };
      listImageChildProduct.length = 0;
      listImageChildProduct.push(temp);
      getImageStore.reset();
    } else if (n == 1) {
      // selected.value = undefined;
      getImageStore.reset();
    }
  }
);

provide("selectedImage", selected);

const text = ref("");
const html = ref<string>("");
function renderHtml(htmlText: string, textMardown: string) {
  html.value = htmlText;
  text.value = textMardown;
}

const listImages = reactive<IlistImage[]>([
  {
    uuid: uuidv4(),
    link: "",
    preImage: "",
    nameImage: "",
  },
]);

const listAttribute = reactive<IattributeAdmin[]>([
  {
    uuid: uuidv4(),
    k: "",
    v: "",
  },
]);

const listImageChildProduct = reactive<Iattribute[]>([]);

provide("listImageChildProduct", listImageChildProduct);

const product = ref(getProduct.listProduct);
const initProduct = ref<Iproduct>();

provide("productLIst", product);
watch(
  () => getProduct.isEc,
  (n) => {
    if (n == 0) {
      product.value = getProduct.listProduct;
      initProduct.value = _.cloneDeep(getProduct.listProduct);
    }
    getProduct.reset();
  }
);

function hanlderOnlick() {
  console.log("--->", html.value);
  console.log("--->", toRaw(listImages));
  console.log("---->", toRaw(product.value));
}
const productImage = addImageIntoProduct();
async function editImage() {
  const arrayImage: File[] = [];
  const listImage = toRaw(listImages);
  if (
    listImage &&
    !listImage[0].link &&
    !listImage[0].preImage &&
    !listImage[0].nameImage
  ) {
    toast.error(`image isn't existed`);
    return;
  }
  for (let item of toRaw(listImages)) {
    arrayImage.push(item.link);
  }
  await productImage.addImage(arrayImage, idProduct.value);
}

const productDescription = addDescriptionIntoProduct();
async function editDescription() {
  const data: IdescriptionProduct = {
    html: html.value,
    text: text.value,
    productId: idProduct.value,
  };
  await productDescription.addDescription(data);
}
watch(
  () => productDescription.isEc,
  (n) => {
    if (n == 0) {
      toast.success(productDescription.isEM);
      productDescription.$reset();
    } else if (n == 1) {
      toast.error(productDescription.isEM);
      productDescription.$reset();
    }
  }
);
const productAttribute = addAttributeIntoProduct();
async function editAttribute() {
  const newData: Iattribute[] = [];
  const rawData = toRaw(listAttribute);
  for (let i = 0; i < rawData.length; i++) {
    const temp: Iattribute = {
      productId: idProduct.value,
      k: rawData[i].k,
      v: rawData[i].v,
    };
    newData.push(temp);
  }
  await productAttribute.addAttribute(newData);
}

watch(
  () => productAttribute.isEc,
  async (n) => {
    if (n == 0) {
      setTimeout(async () => {
        await productAttributeStore.getAttribute(idProduct.value);
        productAttribute.reset();
        listAttribute.length = 0;
        const temp: IattributeAdmin = {
          uuid: uuidv4(),
          k: "",
          v: "",
        };
        listAttribute.push(temp);
        toast.success("add attribute success");
      }, 300);
    } else if (n == 1) {
      toast.error("add attribute faild");
      productAttribute.reset();
    }
  }
);
const productAttributeStore = getAttributeOfProduct();
const updateProductStore = updateProduct();
const quantity = ref(0);
provide("quantity", quantity);
async function editProduct() {
  const newProduct = toRaw(product.value);
  const initRawProduct = toRaw(initProduct.value);
  const defferentVar: any = differentObject(newProduct, initRawProduct);
  defferentVar.quantity = quantity.value;
  await updateProductStore.updateProduct({
    id: idProduct.value,
    ...defferentVar,
  });
}

const isOpenModalUpdate = ref(false);
const currentAttribute = reactive<Partial<Iattribute>>({});
function hanlderClickUpdate(att: Iattribute) {
  Object.assign(currentAttribute, att);
  isOpenModalUpdate.value = !isOpenModalUpdate.value;
}
const updateAttibute = updateAttributeOfProduct();
async function hanlderSubmitUpdateAttribute() {
  if (!currentAttribute) return;
  await updateAttibute.updateAttribute(toRaw(currentAttribute));
}
const addChildProductStore = addChildProduct();
async function editChildProduct() {
  const newChildProduct = listImageChildProduct.map((item) => {
    return {
      productId: idProduct.value,
      image: item.image == "none" ? null : item.image,
      k: item.k,
      v: item.v,
      quantity: item.quantity,
    };
  });
  await addChildProductStore.addchildProducts(newChildProduct);
  console.log(newChildProduct);
}
watch(
  () => addChildProductStore.isEc,
  async (n) => {
    if (n == 0) {
      // await getProduct.getProductById(idProduct.value),
      toast.success(addChildProductStore.isEM);
      const temp: Iattribute = {
        uuid: uuidv4(),
        k: "",
        v: "",
        publicId: "",
        image: selected.value,
      };
      listImageChildProduct.length = 0;
      listImageChildProduct.push(temp);
      addChildProductStore.reset();
    } else if (n == 1) {
      toast.error(addChildProductStore.isEM);
      addChildProductStore.reset();
    }
  }
);

watch(
  () => updateProductStore.isEc,
  async (n) => {
    if (n == 0) {
      // await getProduct.getProductById(idProduct.value),
      toast.success(updateProductStore.isEM);
      updateProductStore.reset();
    } else if (n == 1) {
      toast.error(updateProductStore.isEM);
      updateProductStore.reset();
    }
  }
);
watch(
  () => updateAttibute.isEc,
  (n) => {
    if (n == 0) {
      setTimeout(async () => {
        await productAttributeStore.getAttribute(idProduct.value);
        updateAttibute.reset();
        isOpenModalUpdate.value = !isOpenModalUpdate.value;
        toast.success(updateAttibute.isEM);
      }, 300);
    } else if (n == 1) {
      toast.error(updateAttibute.isEM);
      updateAttibute.reset();
    }
  }
);
provide("hanlderClickUpdate", hanlderClickUpdate);
provide("currentAttribute", currentAttribute);
provide("listImages", listImages);
provide("listAttribute", listAttribute);
provide("hanlderSubmitUpdateAttribute", hanlderSubmitUpdateAttribute);
</script>

<template>
  <div>
    <div>
      <div class="w-2/5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <Select @getProductOfCategory="getProductOfCategory" />
      </div>
      <div v-if="listProduct?.length > 0">
        <div class="w-2/5 mt-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <SelectProduct
            @hanlderOnlickSelectProduct="hanlderOnlickSelectProduct"
            :listProduct="listProduct"
          />
        </div>

        <div v-if="getProduct.listProduct" class="mt-3 w-full">
          <div class="text-xl font-bold mb-2">Information of Product</div>
          <div class="flex gap-3">
            <div class="w-2/5">
              <FormAttribute />
            </div>
            <div><InputImg :id="idProduct" /></div>
          </div>
        </div>
      </div>

      <div v-else class="mt-5">Not Found Product</div>
    </div>
    <hr v-if="getProduct.listProduct" />
    <div v-if="getProduct.listProduct" class="text-lg font-bold text-gray-500">
      Description Manager
    </div>
    <div v-if="getProduct.listProduct">
      <AccodianAttribute @renderHtml="renderHtml" />
    </div>

    <div
      v-if="
        getProduct.listProduct && getProduct.listProduct.at_product?.length > 0
      "
    >
      <hr />
      <div class="text-lg font-bold text-gray-500">Attribute Table Manager</div>
      <div>
        <AccodianListAttribute />
      </div>
    </div>

    <div v-if="getProduct.listProduct">
      <hr />
      <div class="text-lg font-bold text-gray-500">Image Manager</div>
      <div><AccodianImageProduct /></div>
    </div>

    <div v-if="getProduct.listProduct">
      <div class="text-lg font-bold text-gray-500">
        Child Product Table Manager
      </div>
      <AccodianChildProduct />
    </div>

    <div v-if="getProduct.listProduct">
      <div class="text-lg font-bold text-gray-500">Child Product Manager</div>
      <ChildProduct />
    </div>

    <div v-if="getProduct.listProduct">
      <hr class="mt-3" />
      <div class="text-lg font-bold text-gray-500">Attribute Manager</div>
      <div>
        <AddAttribute />
      </div>
    </div>

    <hr class="mt-3" />
    <div
      class="mt-2"
      v-if="getProduct.listProduct || !productDescription.isLoading"
    >
      <PropoverSubmit
        @editImage="editImage"
        @editDescription="editDescription"
        @editAttribute="editAttribute"
        @editProduct="editProduct"
        @editChildProduct="editChildProduct"
      />
    </div>
    <div>
      <ModalUpdateAttribute v-model:isOpenModalUpdate="isOpenModalUpdate" />
    </div>
  </div>
</template>

<style scoped></style>
