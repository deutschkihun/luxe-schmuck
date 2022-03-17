import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_FIND_EMAIL_FAIL,
  USER_FIND_EMAIL_REQUEST,
  USER_FIND_EMAIL_RESET,
  USER_FIND_EMAIL_SUCCESS,
  USER_FIND_PASSWORD_FAIL,
  USER_FIND_PASSWORD_REQUEST,
  USER_FIND_PASSWORD_RESET,
  USER_FIND_PASSWORD_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_RESET,
  USER_RESET_PASSWORD_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../actions/types";
import { IFormInputs, UserListProps } from "../helper/interface";

export const userloginReducer = (
  state = {},
  action: { type: string; payload: IFormInputs; error: string }
): {
  loading?: boolean;
  userInfo?: IFormInputs;
  error?: string;
} => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.error };
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
    payload: IFormInputs;
    error: string;
  }
): {
  loading?: boolean;
  userInfo?: IFormInputs;
  error?: string;
} => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = {},
  action: {
    type: string;
    payload: IFormInputs;
    error: string;
  }
): {
  loading?: boolean;
  user?: IFormInputs | Record<string, unknown>;
  error?: string;
} => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.error };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = {},
  action: {
    type: string;
    error: string;
  }
): {
  loading?: boolean;
  success?: boolean;
  userInfo?: Promise<void | IFormInputs>;
  error?: string;
} => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.error };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userFindEmailReducer = (
  state = {},
  action: {
    type: string;
    payload: string;
    error: string;
  }
): {
  loading?: boolean;
  email?: string;
  error?: string;
} => {
  switch (action.type) {
    case USER_FIND_EMAIL_REQUEST:
      return { loading: true };
    case USER_FIND_EMAIL_SUCCESS:
      return { loading: false, email: action.payload };
    case USER_FIND_EMAIL_FAIL:
      return { loading: false, error: action.error };
    case USER_FIND_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const userFindPasswordReducer = (
  state = {},
  action: {
    type: string;
    payload: { email: string; pin: string };
    error: string;
  }
): {
  loading?: boolean;
  pin?: string;
  error?: string;
  email?: string;
} => {
  switch (action.type) {
    case USER_FIND_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FIND_PASSWORD_SUCCESS:
      return {
        loading: false,
        email: action.payload.email,
        pin: action.payload.pin,
      };
    case USER_FIND_PASSWORD_FAIL:
      return { loading: false, error: action.error };
    case USER_FIND_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userResetPasswordReducer = (
  state = {},
  action: {
    type: string;
    payload: { success?: boolean };
    error: string;
  }
): {
  loading?: boolean;
  success?: boolean;
  error?: string;
} => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload.success };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.error };
    case USER_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (
  state = {},
  action: {
    type?: string;
    payload: {
      users: UserListProps["users"];
      error: string;
    };
  }
): {
  loading?: boolean;
  userlist?: UserListProps["users"];
  error?: string;
} => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, userlist: action.payload.users };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state = {},
  action: { type: string; error: string; success: boolean }
): {
  loading?: boolean;
  success?: boolean;
  error?: string;
} => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};
