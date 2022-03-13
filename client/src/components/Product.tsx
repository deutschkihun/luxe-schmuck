import React from "react";
import { Link } from "react-router-dom";
import { ProductProps } from "../helper/interface";
import { Rating } from "./Rating";

export const Product = (props: ProductProps): JSX.Element => {
  const { _id, image, name, rating, numReviews, price } = props;
  return (
    <Link className="product" to={`/shop/product/${_id}`}>
      <img src={image} alt="product_image" />
      <div>{name}</div>
      <Rating value={rating} text={`${numReviews} reviews`} />${price}
    </Link>
  );
};
