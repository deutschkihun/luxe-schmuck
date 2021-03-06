import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SubmitButton, Title, Warning } from "../helper/lib";
import { ProductProps } from "../helper/interface";
import { ProductReviews } from "./ProductReviews";
import { LoginMsg } from "../helper/message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addToCart } from "../actions/cartActions";
import { LoadingView } from "../components/LoadingView";

interface Props {
  product: ProductProps;
}

export const ProductInfo = (props: Props): JSX.Element => {
  const { product } = props;
  const [qty, setQty] = useState(1);
  const history = useHistory();
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const { success, loading, error } = cart;

  const addToCartHandler = () => {
    if (userInfo) {
      dispatch(addToCart(userInfo, product, qty));
    } else {
      if (window.confirm(LoginMsg)) {
        history.push("/login");
      }
    }
  };

  return (
    <>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : error ? (
        <Warning>{error}</Warning>
      ) : (
        <>
          <Title style={{ borderBottom: "none" }}>{product.productname}</Title>
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
          </table>
          {success && (
            <Warning>
              Congraulations. Your request is successfully saved
            </Warning>
          )}

          <SubmitButton
            disabled={product.countInStock == 0 ? true : false}
            onClick={addToCartHandler}
            style={
              product.countInStock == 0 ? { opacity: "0.5" } : { opacity: "1" }
            }
          >
            {product.countInStock == 0
              ? "temporarily not available"
              : "Add to Cart"}
          </SubmitButton>
          <ProductReviews product={product} />
        </>
      )}
    </>
  );
};
