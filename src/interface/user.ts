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
