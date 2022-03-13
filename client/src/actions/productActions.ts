/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./types";

export const listProducts =
  (keyword = "", category = "", pageNumber = "") =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&category=${category}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error,
        /*error.response && error.response.data.message
            ? error.response.data.message
            : error.message,*/
      });
    }
  };
