export interface Iuser {
  id?: any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: string;
  image: any;
  roleId: string;
}
export interface Iouput<T> {
  EC: number;
  EM: string;
  data?: T;
}
export interface Icategory {
  id?: any;
  nameVi: string;
  nameEn: string;
  parentId: any;
  image: any;
  publicId?: any;
  cate_pro?: Iproduct[];
}
export interface Iproduct {
  uuid?: string;
  id?: number;
  nameVi: string;
  nameEn: string;
  description?: string;
  price: any;
  discount?: string;
  totalRatings?: string;
  totalPrices?: string;
  totalStarts?: string;
  hot?: string;
  categoryId: string;
  branch: string;
  pro_des?: IdescriptionProduct;
  at_product?: Iattribute[];
  image?: any;
  quantity?: number;
}
export interface Iinventory {
  id?: number;
  quantity: number;
  productId?: number;
}
export interface IdescriptionProduct {
  html: string;
  text: string;
  productId: number;
}
export interface Iattribute {
  id?: number;
  productId?: number;
  k: string;
  v: string;
  publicId?: string;
  uuid?: string;
  image?: any;
  quantity?: number;
}

export interface IallAttributeProduct<T> {
  res: T;
  count: number;
}

export interface IimageProduct {
  id?: number;
  image: string;
  publicId: string;
  productId?: number;
}
export interface IchildProduct {
  k: any;
  v: any;
  productId?: number;
  id?: number;
  image: any;
  product_child_inventory?: {
    quantity: number;
  };
}
export interface Ishop {
  id: number;
  userId: any;
  image: any;
  backlog: any;
  description: string;
  name: string;
  address: string;
}
export interface Icounpon {
  dateTo: any;
  description: string;
  discount: any;
  limit: any;
  status: string;
  type: string;
  condition: any;
  id: number;
  code_type?: {
    valueVi: string;
  };
  code_status?: {
    valueVi: string;
    keyMap: string;
  };
}
export interface IdataCoupon<T> {
  rows: T;
  count: number;
}
export interface IorderItems {
  id: number;
  orderId: number;
  productId: number;
  shopId: number;
  productChildId: number | undefined;
  quantity: number;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  status_allcode: {
    id: number;
    type: string;
    keyMap: string;
    valueEn: string;
    valueVi: string;
    createdAt: string;
    updatedAt: string;
  };
  guess: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: string;
  };
  pro_Order: Iproduct;
  infor_Order: {
    id: number;
    productId: number;
    k: string;
    v: string;
    image: string;
  };
  inventory: number;
}
