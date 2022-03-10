import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actions/types";
import { IFormInputs } from "../helper/interface";

export const userloginReducer = (
  state = {},
  action: { type: string; payload: Promise<void | IFormInputs> }
): {
  loading?: boolean;
  userInfo?: Promise<void | IFormInputs>;
  error?: Promise<void | IFormInputs>;
} => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = {},
  action: {
    type: string;
    payload: Promise<void | IFormInputs>;
  }
): {
  loading?: boolean;
  userInfo?: Promise<void | IFormInputs>;
  error?: Promise<void | IFormInputs>;
} => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const logout =
  () =>
  (dispatch: (arg0: { type: string }) => void): void => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    document.location.href = "/login";
  };
