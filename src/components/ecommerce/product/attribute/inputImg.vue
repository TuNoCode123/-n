<script setup lang="ts">
import Minus from "@/components/SvgComponent/minus.vue";
import Plus from "@/components/SvgComponent/plus.vue";
import { inject, reactive, ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { convertFileIntoBase64 } from "@/util/convert";

import { addImageIntoProduct, getImageOfProduct } from "@/pinia/productStore";
import { toast } from "vue3-toastify";
import { VueSpinner } from "vue3-spinners";

export interface IlistImage {
  uuid: string;
  link: any;
  preImage: any;
  nameImage: string;
}
const props = defineProps<{
  id: any;
}>();
function hanlerClickOnPlus() {
  const Temp_Image: IlistImage = {
    uuid: uuidv4(),
    link: "",
    preImage: "",
    nameImage: "",
  };
  listImages.push(Temp_Image);
}
const listImages = inject<IlistImage[]>("listImages");
async function updateListImage(event: Event, uuid: string) {
  const tempImages = _.cloneDeep(listImages);
  if (!tempImages || !listImages) return;
  const chooseImage = tempImages.find((item) => item.uuid == uuid);
  const chooseIndexImage = tempImages.findIndex((item) => item.uuid == uuid);
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files.length > 0 && chooseImage) {
    const fileImg = input.files[0] as File;
    const imgBase64 = await convertFileIntoBase64(fileImg);
    chooseImage["preImage"] = imgBase64;
    chooseImage["link"] = fileImg;
    tempImages[chooseIndexImage] = chooseImage;
    listImages.length = 0;
    listImages.push(...tempImages);
  }
}
function hanlerClickOnMinus(id: any) {
  const tempImages = _.cloneDeep(listImages);
  if (!tempImages || !listImages) return;
  const restImage = tempImages.filter((item) => item.uuid != id);
  listImages.length = 0;
  listImages.push(...restImage);
}
const productImage = addImageIntoProduct();
const imageProductStore = getImageOfProduct();
watch(
  () => productImage.isEc,
  async (n) => {
    if (n == 0) {
      toast.success("add image success");
      listImages.length = 0;
      const Temp_Image: IlistImage = {
        uuid: uuidv4(),
        link: "",
        preImage: "",
        nameImage: "",
      };
      listImages.push(Temp_Image);
      await imageProductStore.getImage(props.id);
      productImage.reset();
    } else if (n == 1) {
      toast.error("add image faild");
      productImage.reset();
    }
  }
);
const isOpenVi = ref(false);
</script>

<template>
  <VueSpinner
    v-if="productImage.isLoading"
    size="45"
    color="rgb(93, 197, 150)"
  />
  <div v-else class="grid grid-cols-2 gap-2">
    <div v-for="(item, index) in listImages" :key="index">
      <div>
        <input
          type="file"
          :name="item.uuid"
          :id="item.uuid"
          :value="item.nameImage"
          hidden
          @input="(e) => updateListImage(e, item.uuid)"
        />
      </div>
      <div class="w-64 h-14 mx-auto flex items-center gap-3">
        <label
          class="flex justify-center items-center text-gray-400 text-sm w-full h-full mx-auto border-dashed border-2 border-zinc-600"
          :for="item.uuid"
        >
          <div v-if="item.preImage" class="w-9/12 h-full mx-auto">
            <img :src="item.preImage" class="w-full h-full object-contain" />
          </div>
          <span v-else>Select Img</span>
        </label>
        <div class="flex">
          <Plus @click="hanlerClickOnPlus" class="cursor-pointer" />
          <Minus
            v-if="listImages && listImages.length > 1"
            @click="() => hanlerClickOnMinus(item.uuid)"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>
