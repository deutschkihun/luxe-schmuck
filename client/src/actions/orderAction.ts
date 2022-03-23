import axios from "axios";
import { IFormInputs, OrderProp, OrderProps } from "../helper/interface";
import { failToCreate, unauthorized } from "../helper/message";
import { jsonConfig, tokenConfig } from "../helper/utils";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  CART_CLEAR_ITEMS,
} from "./types";
import { logoutUser } from "./userActions";

export const createOrder =
  (order: OrderProp) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: OrderProps; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: IFormInputs } }
  ): Promise<void> => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.post(`/api/orders`, order, {
        ...jsonConfig,
        ...tokenConfig(userInfo.token as string),
      });

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      });
    } catch (error) {
      let message;
      if (error instanceof Error)
        if (error.message == unauthorized) {
          await dispatch(logoutUser());
          message = error.message;
        } else {
          message = failToCreate;
        }
      dispatch({
        type: ORDER_CREATE_FAIL,
        error: message,
      });
    }
  };
