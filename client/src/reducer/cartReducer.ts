import {
  CART_ADD_ITEM_SUCCESS,
  CART_CLEAR_ITEMS,
  CART_REQUEST,
} from "../actions/types";
import { CartProp } from "../helper/interface";

export const cartReducer = (
  state = {},
  action: { type: string; payload: CartProp }
): {
  loading?: boolean;
} => {
  switch (action.type) {
    case CART_REQUEST:
      return { ...state, loading: true };
    case CART_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    /*const existItem = newState.cartItems.find(
        (x) => x.productname === item?.productname
      );
      if (existItem) {
        return {
          ...state,
          cartItems: newState.cartItems.map((x) =>
            x.productname === existItem.productname ? item : x
          ),
          loading: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...newState.cartItems, item],
          loading: false,
        };
      }*/
    case CART_CLEAR_ITEMS:
      return {};
    default:
      return state;
  }
};
