import React, { useState } from "react";
import { Descriptions } from "antd";
import { Rating } from "../components/Rating";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Title } from "../helper/lib";
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
    <div>
      <Title>{product.productname}</Title>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{product.numReviews}</Descriptions.Item>
        <Descriptions.Item label="View">
          {product.countInStock}
          {/*
           <div
                  className={`${
                    (product.countInStock as number) > 0
                      ? "in-stock"
                      : "sold-out"
                  }`}
                >
            {(product?.countInStock as number) > 0
            ? "In Stock"
            : "Out Of Stock"}
          */}
        </Descriptions.Item>

        {(product.countInStock as number) > 0 && (
          <div className="quantity">
            <span>Qty</span>
            <select className="select" value={qty}>
              {Array.from(Array(product.countInStock).keys()).map(
                (x, index) => (
                  <option key={index} value={x + 1}>
                    {x + 1}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        <Descriptions.Item label="Description">
          {product.description}
        </Descriptions.Item>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Descriptions>

      <br />
      <br />
      <br />
      <button
        disabled={product.countInStock === 0 ? true : false}
        onClick={addToCartHandler}
      >
        ADD TO CART
      </button>
    </div>
  );
};
