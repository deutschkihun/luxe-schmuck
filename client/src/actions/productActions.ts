/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { failToDelete, failToLoad, unauthorized } from "../helper/message";
import { tokenConfig } from "../helper/utils";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./types";
import { logoutUser } from "./userActions";

export const listProducts =
  (keyword = "", category = "", pageNumber = 0) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&category=${category}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: {
            error: failToLoad,
          },
        });
      }
    }
  };

export const deleteProduct =
  (id: string) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: any }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: any } }
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      await axios.delete(`/api/v1/products/${id}`, tokenConfig(userInfo.token));
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      let message;
      if (error instanceof Error) {
        if (error.message == unauthorized) {
          await dispatch(logoutUser());
          message = error.message;
        } else {
          message = failToDelete;
        }
      }
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      });
    }
  };
