import axios from "axios";
import { CartProp } from "../helper/interface";
import { CART_ADD_ITEM_SUCCESS, CART_REQUEST } from "./types";

export const addToCart =
  (id: string, qty: number) =>
  async (
    dispatch: (arg0: { type: string; payload?: CartProp }) => void
  ): Promise<void> => {
    dispatch({
      type: CART_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        _id: data._id,
        productname: data.productname,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
      },
    });

    //localStorage.setItem("cartItems", JSON.stringify(getState().cart));
  };
