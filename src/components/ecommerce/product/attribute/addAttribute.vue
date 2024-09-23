<script setup lang="ts">
import Minus from "@/components/SvgComponent/minus.vue";
import Plus from "@/components/SvgComponent/plus.vue";
import { inject, reactive, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import Label from "@/components/ui/label/Label.vue";

export interface IattributeAdmin {
  uuid: string;
  k: string;
  v: string;
}

function hanlerClickOnPlus() {
  const Temp_Image: IattributeAdmin = {
    uuid: uuidv4(),
    k: "",
    v: "",
  };
  IistAttributes.push(Temp_Image);
}
const IistAttributes = inject<IattributeAdmin[]>("listAttribute");
async function updateListAttribute(
  event: Event,
  uuid: string,
  type: keyof IattributeAdmin
) {
  const tempImages = _.cloneDeep(IistAttributes);
  if (!tempImages || !IistAttributes) return;
  const chooseImage = tempImages.find((item) => item.uuid == uuid);
  if (!chooseImage) return;
  const chooseIndexImage = tempImages.findIndex((item) => item.uuid == uuid);
  const input = event.target as HTMLInputElement;
  chooseImage[type] = input.value;
  tempImages[chooseIndexImage] = chooseImage;
  IistAttributes.length = 0;
  IistAttributes.push(...tempImages);
}
function hanlerClickOnMinus(id: any) {
  const tempImages = _.cloneDeep(IistAttributes);
  if (!tempImages || !IistAttributes) return;
  const restImage = tempImages.filter((item) => item.uuid != id);
  IistAttributes.length = 0;
  IistAttributes.push(...restImage);
}
const isOpenVi = ref(false);
</script>

<template>
  <div class="grid grid-cols-1 gap-2">
    <div
      v-for="(item, index) in IistAttributes"
      :key="index"
      class="flex gap-2 items-center"
    >
      <div class="flex gap-2">
        <div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <Label>Thuộc tính</Label>
          <input
            id="branch"
            class="outline-none h-10 p-2 border-2 rounded-sm"
            type="text"
            placeholder="Nhập Thuộc tính"
            :value="item.k"
            @input="(e) => updateListAttribute(e, item.uuid, 'k')"
          />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
          <Label>Giá trị</Label>
          <input
            id="branch"
            class="outline-none h-10 p-2 border-2 rounded-sm"
            type="text"
            placeholder="Nhập Giá trị"
            :value="item.v"
            @input="(e) => updateListAttribute(e, item.uuid, 'v')"
          />
        </div>
      </div>
      <div class="flex">
        <Plus @click="hanlerClickOnPlus" class="cursor-pointer" />
        <Minus
          v-if="IistAttributes && IistAttributes.length > 1"
          @click="() => hanlerClickOnMinus(item.uuid)"
          class="cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
