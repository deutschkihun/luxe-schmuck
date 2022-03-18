import React, { useState } from "react";
import { Rating } from "../components/Rating";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, SubmitButton, Title } from "../helper/lib";
import { ProductProps } from "../helper/interface";

interface Props {
  product: ProductProps;
}

export const ProductInfo = (props: Props): JSX.Element => {
  const { product } = props;
  const [qty, setQty] = useState(1);
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <Title>{product.productname}</Title>
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
            <th scope="col">REVIEWS</th>
          </tr>
        </thead>
        <tbody>
          <tr key={product._id}>
            <td>{product.description}</td>
            <td>{product.numReviews}</td>
          </tr>
        </tbody>
      </table>

      {(product?.countInStock as number) > 0 && (
        <div className="quantity">
          <span>Qty</span>
          <select className="select" value={qty}>
            {Array.from(Array(product.countInStock).keys()).map((x, index) => (
              <option key={index} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {/*<Rating value={product.rating + 1} text={`${product.numReviews} reviews`} />*/}

      <SubmitButton
        className={`${
          (product?.countInStock as number) == 0 ? "sold-out" : "in-stock"
        }`}
        disabled={product.countInStock == 0 ? true : false}
        onClick={addToCartHandler}
      >
        Add to Cart
      </SubmitButton>
    </>
  );
};
