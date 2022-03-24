import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userFindEmailReducer,
  userloginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userFindPasswordReducer,
  userResetPasswordReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducer/userReducer";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";

export const rootReducer = combineReducers({
  userLogin: userloginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userFindEmail: userFindEmailReducer,
  userFindPassword: userFindPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
