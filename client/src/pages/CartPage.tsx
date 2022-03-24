import React from "react";
import { useSelector } from "react-redux";
import { ListTitle, ProductListContainer, Title } from "../helper/lib";
import { RootState } from "../store";

export const CartPage = (): JSX.Element => {
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <>
      <ProductListContainer>
        <ListTitle>Your items in cart</ListTitle>
        <Title style={{ borderBottom: "none" }}></Title>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Productname</th>
              <th scope="col">BRAND</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
        </table>
      </ProductListContainer>
    </>
  );
};
