import axios from "axios";
import { IFormInputs, ProductReviews } from "../helper/interface";
import {
  failToCreate,
  failToDelete,
  failToLoad,
  unauthorized,
} from "../helper/message";
import { jsonConfig, tokenConfig } from "../helper/utils";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
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
  PRODUCT_UPDATE_SUCCESS,
} from "./types";
import { logoutUser } from "./userActions";

export const listProducts =
  () =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: IFormInputs;
      error?: string;
    }) => void
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(`/api/v1/products`);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          error: failToLoad,
        });
      }
    }
  };

export const deleteProduct =
  (id: string) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: IFormInputs; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: IFormInputs } }
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      await axios.delete(
        `/api/v1/products/${id}`,
        tokenConfig(userInfo.token as string)
      );
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
        error: message,
      });
    }
  };

export const createProduct =
  (product: IFormInputs) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: IFormInputs; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: IFormInputs } }
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.post(`/api/v1/products`, product, {
        ...jsonConfig,
        ...tokenConfig(userInfo.token as string),
      });

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      let message;
      if (error instanceof Error) {
        if (error.message == unauthorized) {
          await dispatch(logoutUser());
          message = error.message;
        } else {
          message = failToCreate;
        }
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        error: message,
      });
    }
  };

export const listProductDetails =
  (id: string) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: IFormInputs; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/products/${id}`);
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
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
        type: PRODUCT_DETAILS_FAIL,
        error: message,
      });
    }
  };

export const updateProduct =
  (product: IFormInputs) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: IFormInputs; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: IFormInputs } }
  ): Promise<void> => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.put(
        `/api/v1/products/${product._id}`,
        product,
        {
          ...jsonConfig,
          ...tokenConfig(userInfo.token as string),
        }
      );

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
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
        type: PRODUCT_UPDATE_FAIL,
        error: message,
      });
    }
  };

export const createProductReview =
  (productId: string, review: ProductReviews) =>
  async (
    dispatch: (
      arg0:
        | { type: string; payload?: IFormInputs; error?: string }
        | ((dispatch: (arg0: { type: string }) => void) => void)
    ) => void,
    getState: () => { userLogin: { userInfo: IFormInputs } }
  ): Promise<void> => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      await axios.post(`/api/v1/products/${productId}/reviews`, review, {
        ...jsonConfig,
        ...tokenConfig(userInfo.token as string),
      });

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        if (error.message == unauthorized) {
          await dispatch(logoutUser());
          message = error.message;
        } else {
          message = failToCreate;
        }
      }

      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        error: message,
      });
    }
  };
