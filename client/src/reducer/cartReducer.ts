import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  CART_GET_ITEM_FAIL,
  CART_GET_ITEM_SUCCESS,
  CART_REQUEST,
} from "../actions/types";
import { CartProp } from "../helper/interface";

export const cartReducer = (
  state = {},
  action: { type: string; success: boolean; error: string }
): {
  loading?: boolean;
  success?: boolean;
  error?: string;
} => {
  switch (action.type) {
    case CART_REQUEST:
      return { loading: true };
    case CART_ADD_ITEM_SUCCESS:
      return { loading: false, success: true };
    case CART_ADD_ITEM_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getCartItem = (
  state = {},
  action: { type: string; payload: Array<CartProp>; error: string }
): {
  loading?: boolean;
  cartItem?: Array<CartProp>;
  error?: string;
} => {
  switch (action.type) {
    case CART_REQUEST:
      return { loading: true };
    case CART_GET_ITEM_SUCCESS:
      console.log(action.payload);
      return { loading: false, cartItem: action.payload };
    case CART_GET_ITEM_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};
