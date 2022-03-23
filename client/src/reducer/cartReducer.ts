/* eslint-disable no-case-declarations */
import {
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_REQUEST,
} from "../actions/types";
import { CartProp } from "../helper/interface";

export const cartReducer = (
  state = {},
  action: { type: string; payload: CartProp }
): {
  cartItems?: (
    | {
        id?: string;
        productname?: string;
        qty?: number;
        price?: number;
        countInStock?: number;
        image?: string;
      }
    | CartProp
  )[];
  loading?: boolean;
} => {
  switch (action.type) {
    case CART_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_ADD_ITEM_SUCCESS:
      const item = action.payload;
      console.log(item, state);
      return {
        loading: false,
      };
    /*const existItem = state.cartItems.find(
        (x) => x.productname === item?.productname
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productname === existItem.productname ? item : x
          ),
          loading: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          loading: false,
        };
      }*/
    /*case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload._id),
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };*/
    default:
      return state;
  }
};
