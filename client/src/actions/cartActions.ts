import axios from "axios";
import { CartProp, IFormInputs, ProductProps } from "../helper/interface";
import { failToUpdate, unauthorized } from "../helper/message";
import { jsonConfig, tokenConfig } from "../helper/utils";
import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  CART_REQUEST,
} from "./types";
import { logoutUser } from "./userActions";

export const addToCart =
  (user: IFormInputs, product: ProductProps, qty: number) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: CartProp; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void
  ): Promise<void> => {
    try {
      dispatch({
        type: CART_REQUEST,
      });

      console.log("here", user, product, qty);

      const cartItem = {
        product: product._id,
        productname: product.productname,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      };

      const { data } = await axios.patch(
        `/api/v1/users/cart/profile`,
        { user, cart: cartItem },
        {
          ...jsonConfig,
          ...tokenConfig(user.token as string),
        }
      );

      dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data });
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        if (error.message == unauthorized) {
          await dispatch(logoutUser());
          message = error.message;
        } else {
          message = failToUpdate;
        }
      }

      dispatch({
        type: CART_ADD_ITEM_FAIL,
        error: message,
      });
    }
  };
