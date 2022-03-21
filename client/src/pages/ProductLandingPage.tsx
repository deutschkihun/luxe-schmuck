import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import {
  HighlightLink,
  Img,
  ProductComponent,
  ProductContainer,
  Warning,
} from "../helper/lib";
import { LoadingView } from "../components/LoadingView";
import { RootState } from "../store";
import { Rating } from "../components/Rating";
import { Row } from "antd";

export const ProductLandingPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <ProductContainer>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : products ? (
        <>
          <Row gutter={[16, 16]}>
            <ProductComponent>
              {products?.map((product) => (
                <HighlightLink
                  key={product._id}
                  to={`/product/${product._id}`}
                  style={{ margin: "0.5rem" }}
                >
                  <Img src={product.image} alt="product_image" />
                  <div>{product.productname}</div>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  <div>${product.price}</div>
                </HighlightLink>
              ))}
            </ProductComponent>
          </Row>
        </>
      ) : (
        <Warning>{error as string}</Warning>
      )}
    </ProductContainer>
  );
};
