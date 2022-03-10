/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IFormInputs } from "../helper/interface";
import { userExist, wrongCredential } from "../helper/message";
import { jsonConfig, tokenConfig } from "../helper/utils";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./types";

export const registerUser =
  (body: IFormInputs) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void
  ): Promise<void> => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const { data } = await axios.post(
        "/api/v1/users/register",
        {
          email: body.email,
          firstname: body.firstName,
          lastname: body.lastName,
          password: body.password,
        },
        jsonConfig
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error instanceof Error ? (error.message = userExist) : userExist,
      });
    }
  };

export const loginUser =
  (body: IFormInputs) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void
  ): Promise<void> => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await axios.post(
        "/api/v1/users/login",
        { email: body.email, password: body.password },
        jsonConfig
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error instanceof Error
            ? (error.message = wrongCredential)
            : wrongCredential,
      });
    }
  };

export const logoutUser =
  () =>
  (dispatch: (arg0: { type: string }) => void): void => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    document.location.href = "/login";
  };

export const getUserDetails =
  (id: string) =>
  async (
    dispatch: (arg0: { type: string; payload?: any }) => void
  ): Promise<void> => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      // error position
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `/api/users/${id}`,
        tokenConfig(userInfo.token)
      );

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? (error.message = wrongCredential)
          : wrongCredential;
      /*if (message === "Not authorized, token failed") {
        dispatch(logout());
      }*/
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      });
    }
  };

export const findEmailUser = (body: IFormInputs): void => {
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/users/register",
        {
          firstname: body.firstName,
          lastname: body.lastName,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error,
        /*error.response && error.response.data.message
          ? error.response.data.message
          : error.message,*/
      });
    }
  };
};
function getState(): { userLogin: { userInfo: any } } {
  throw new Error("Function not implemented.");
}
