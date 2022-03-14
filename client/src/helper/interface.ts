import { FieldError, UseFormRegister } from "react-hook-form";

export interface IFormInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirm: string;
  message?: string;
  error?: string;
  isAdmin?: boolean;
  productname?: string;
  brand?: string;
  category?: string;
  countInStock?: number;
  description?: string;
  price?: number;
  image?: string;
}

export interface ProductProps {
  page: number;
  pages: number;
  error: string;
  products: [
    {
      _id?: string;
      name?: string;
      category?: string;
      price?: number;
      brand?: string;
    }
  ];
}

export interface PaginationProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
  category?: string;
}

export interface ErrorProps {
  name: string;
  errors: { [x: string]: FieldError } | undefined;
}

export interface LabelProps {
  label: string;
}

export interface TitleProps {
  title: string;
}

export type InputProps<T> = {
  placeholder: string;
  register: UseFormRegister<T>;
  registerValue:
    | "email"
    | "password_confirm"
    | "password"
    | "firstname"
    | "lastname"
    | "productname"
    | "brand"
    | "image"
    | "description"
    | "countInStock"
    | "category"
    | "price";
  pattern?: RegExp;
  message?: string;
  type?: string;
  defaultValue?: string;
};

export interface RatingProps {
  value: number;
  color: string;
  text: string;
}

export interface ProductProps {
  _id: string;
  name: string;
  rating: number;
  numReviews: number;
  image: string;
  price: number;
}

export interface UserListProps {
  error?: string | undefined;
  users?: [
    {
      _id?: string;
      firstname?: string;
      lastname?: string;
      email?: string;
      isAdmin?: boolean;
    }
  ];
}

export interface MatchParams {
  match: {
    params: {
      pageNumber: number;
      category: string;
      keyword: string;
    };
  };
}
