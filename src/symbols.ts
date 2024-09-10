import { InjectionKey } from "vue";
import { Ilocation } from "./type";
export const LocationSymbol: InjectionKey<Ilocation> = Symbol("location");
export const openSymbol: InjectionKey<Ilocation> = Symbol("isOpen");
