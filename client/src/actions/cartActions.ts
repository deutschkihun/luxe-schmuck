import axios from "axios";
import { CartProp } from "../helper/interface";
import { failToUpdate, unauthorized } from "../helper/message";
import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  CART_REQUEST,
} from "./types";
import { logoutUser } from "./userActions";

export const addToCart =
  (id: string, qty: number) =>
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
      const { data } = await axios.get(`/api/v1/products/${id}`);
      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload: {
          _id: data._id,
          productname: data.productname,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty: qty,
        },
      });
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

    //localStorage.setItem("cartItems", JSON.stringify(getState().cart));
  };
