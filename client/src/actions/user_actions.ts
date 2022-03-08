/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IFormInputs } from "../helper/interface";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./types";

export const registerUser =
  (body: IFormInputs) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
          email: body.email,
          firstname: body.firstName,
          lastname: body.lastName,
          password: body.password,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      // give logged in page right after register
      /*dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });*/

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
