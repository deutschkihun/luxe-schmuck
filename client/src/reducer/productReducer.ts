import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../actions/types";
import { IFormInputs, ProductProps } from "../helper/interface";

export const productListReducer = (
  state = {},
  action: {
    type: string;
    payload: ProductProps;
  }
): {
  loading?: boolean;
  products?: [
    {
      _id?: string;
      name?: string;
      category?: string;
      price?: number;
      brand?: string;
    }
  ];
  page?: number;
  pages?: number;
  error?: string;
} => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [{}] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = {},
  action: { type: string; payload: { error: string } }
): {
  loading?: boolean;
  success?: boolean;
  error?: string;
} => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = {},
  action: {
    type: string;
    payload: { error: string; product: IFormInputs };
  }
): {
  loading?: boolean;
  error?: string;
  product?: IFormInputs;
  success?: boolean;
} => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload.product };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload.error };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
