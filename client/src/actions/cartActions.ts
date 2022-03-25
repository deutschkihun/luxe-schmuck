import axios from "axios";
import { CartProp, IFormInputs, ProductProps } from "../helper/interface";
import {
  failToDelete,
  failToLoad,
  failToUpdate,
  unauthorized,
} from "../helper/message";
import { jsonConfig, tokenConfig } from "../helper/utils";
import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  CART_GET_ITEM_FAIL,
  CART_GET_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_SUCCESS,
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
      await dispatch({
        type: CART_REQUEST,
      });

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

      await dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data });
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

export const getCart =
  (id: string) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: CartProp; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: IFormInputs } }
  ): Promise<void> => {
    try {
      dispatch({ type: CART_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `/api/v1/users/cart/profile/${id}`,
        tokenConfig(userInfo.token as string)
      );

      await dispatch({ type: CART_GET_ITEM_SUCCESS, payload: data });
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        if (error.message == unauthorized) {
          await dispatch(logoutUser());
          message = error.message;
        } else {
          message = failToLoad;
        }
      }

      dispatch({
        type: CART_GET_ITEM_FAIL,
        error: message,
      });
    }
  };

export const deleteCartItem =
  (itemId: string) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: CartProp; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: IFormInputs } }
  ): Promise<void> => {
    try {
      dispatch({ type: CART_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.delete(
        `/api/v1/users/${userInfo._id}/cart/profile/${itemId}`,
        tokenConfig(userInfo.token as string)
      );

      await dispatch({ type: CART_REMOVE_ITEM_SUCCESS, payload: data });
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        if (error.message == unauthorized) {
          await dispatch(logoutUser());
          message = error.message;
        } else {
          message = failToDelete;
        }
      }

      dispatch({
        type: CART_REMOVE_ITEM_FAIL,
        error: message,
      });
    }
  };
