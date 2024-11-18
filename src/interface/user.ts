import exp from "constants";

export interface Iuser {
  id?: any;
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: string;
  image: any;
  roleId?: string;
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
  comment_Rating: IRating[];
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
  shop_Sellers: Iproduct[];
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
export interface IRating {
  id: number;
  productId: number;
  productChildId: number;
  orderId: number;
  star: string;
  status: string;
  content: string;
  totalLike: number;
  totalResponse: number;
  createdAt: Date;
  updatedAt: string;
  comment_rating: Icomment[];
}
export interface Icomment {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  image: string;
  ratingId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface IratingComment {
  productId: number;
  ProductName: string;
  username: string;
  content: string;
  commentId: number;
  date: string;
  rating: number;
  image: string;
  userId: number;
}
export interface Ireply {
  id?: number;
  commentId: number;
  userId: number;
  content: string;
  updatedAt?: any;
  replyId?: any;
}
export interface IinputForGetFigue {
  shopId: number;
  type: string;
}
export interface Ifigue {
  type: string;
  pre: any;
  cur: any;
  change: any;
  iconColor: string;
  valueColor: string;
  changeColor: string;
  detailOrder?: any;
}
export interface IfinalOutcome {
  DT: Ifigue[];
  date: Ifigue;
}
export interface IoutcomeOtherFigure {
  revenueAndOrder: IoutputReOr[];
  category: IoutputCategories[];
  sellMonth: {
    listMonth: string[];
    listProduct: ISellMonthProduct[];
  };
  newListStatus: Istatus[];
}
export interface IoutputReOr {
  month: string;
  total_revenue: number;
  total_Order: number;
}
export interface IoutputCategories {
  id: number;
  category: string;
  total_products: number;
}
export interface ISellMonthProduct {
  name: string;
  sellMonth: number[];
}
export interface Istatus {
  name: string;
  total: number;
  percent: number;
}
export interface Imess {
  roomId: string;
  senderId: number;
  text?: string;
  _id?: string;
  createdAt: string;
  image?: any;
  type?: string;
}
export interface IoutputGetMess {
  roomId: string;
  messages: Imess[];
}
export interface IuserOnline {
  socketId: string;
  userId: number;
}
export interface Inotification {
  senderId: number;
  text: string;
  date: string;
}
