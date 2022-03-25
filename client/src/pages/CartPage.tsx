import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCart } from "../actions/cartActions";
import { LoadingView } from "../components/LoadingView";
import { ListTitle, ProductListContainer, Title, Warning } from "../helper/lib";
import { deleteData } from "../helper/message";
import { RootState } from "../store";

export const CartPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const getCartItem = useSelector((state: RootState) => state.getCart);
  const { cartItem, loading, error } = getCartItem;
  console.log(cartItem);

  useEffect(() => {
    dispatch(getCart(userInfo?._id as string));
  }, []);

  /*const deleteHandler = (id: string) => {
    if (window.confirm(deleteData)) {
      dispatch(deleteCartItem(id));
    }
  };*/

  const totalPrice = cartItem?.reduce((total, item) => {
    total += item.qty * item.price;
    return total;
  }, 0);

  return (
    <>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : error ? (
        <Warning>{error}</Warning>
      ) : (
        <ProductListContainer>
          <ListTitle>Your items in cart</ListTitle>
          <Title style={{ borderBottom: "none" }}></Title>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Productname</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItem?.map((item) => (
                <tr key={item._id}>
                  <td>{item.productname}</td>
                  <td>${item.price}</td>
                  <td>{item.qty}</td>
                  <td>${item.price * item.qty}</td>
                  <td>
                    <button
                      className="btn"
                      //onClick={() => deleteHandler(item._id as string)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </ProductListContainer>
      )}
    </>
  );
};
