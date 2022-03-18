import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../actions/types";
import { IFormInputs, ProductProps, ProductsProps } from "../helper/interface";

export const productListReducer = (
  state = {},
  action: {
    type: string;
    payload: {
      products: ProductsProps;
      page: number;
      pages: number;
    };
    error: string;
  }
): {
  loading?: boolean;
  products?: ProductsProps;
  page?: number;
  pages?: number;
  error?: string;
} => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = {},
  action: { type: string; error: string }
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
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = {},
  action: {
    type: string;
    payload: { product: IFormInputs };
    error: string;
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
      return { loading: false, error: action.error };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = {},
  action: { type: string; payload: ProductProps; error: string }
): {
  loading?: boolean;
  error?: string;
  product?: ProductProps;
} => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      console.log(action.payload);
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = {},
  action: { type: string; payload: { product: IFormInputs }; error: string }
): {
  loading?: boolean;
  success?: boolean;
  product?: IFormInputs;
  error?: string;
} => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload.product };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.error };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (
  state = {},
  action: { type: string; error: string }
): {
  loading?: boolean;
  success?: boolean;
  error?: string;
} => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.error };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
