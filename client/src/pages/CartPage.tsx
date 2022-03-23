import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const CartPage = (): JSX.Element => {
  const cartItems = useSelector((state: RootState) => state.cart);
  console.log("cartItems", cartItems);

  return (
    <>
      {/*<Title style={{ borderBottom: "none" }}>{product.productname}</Title>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">PRICE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">BRAND</th>
            <th scope="col">STOCK</th>
          </tr>
        </thead>
        <tbody>
          <tr key={product._id}>
            <td>{product.productname}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>{product.countInStock}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">TOTAL REVIEWS</th>
            <th scope="col">ORDER QUANTITY</th>
          </tr>
        </thead>
        <tbody>
          <tr key={product._id}>
            <td>{product.description}</td>
            <td>{product.numReviews}</td>
            <td>
              {(product?.countInStock as number) > 0 && (
                <select
                  className="select"
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value))}
                >
                  {Array.from(Array(product.countInStock).keys()).map(
                    (x, index) => (
                      <option key={index} value={x + 1}>
                        {x + 1}
                      </option>
                    )
                  )}
                </select>
              )}
            </td>
          </tr>
        </tbody>
                    </table>*/}
    </>
  );
};
