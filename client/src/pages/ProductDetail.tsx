import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { SingleProductContainer, Warning } from "../helper/lib";
import { LoadingView } from "../components/LoadingView";
import { Row, Col } from "antd";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { useRouteMatch } from "react-router";
import { listProductDetails } from "../actions/productActions";
import { failToLoad } from "../helper/message";

export const ProductDetailPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const productDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const match = useRouteMatch<{ id: string }>();
  const { loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : product ? (
        <>
          <SingleProductContainer>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} style={{ maxWidth: "750px" }}>
                <ProductImage product={product} />
              </Col>
              {
                <Col lg={12} sm={24}>
                  <ProductInfo product={product} />
                </Col>
              }
            </Row>
          </SingleProductContainer>
        </>
      ) : (
        <Warning>{failToLoad}</Warning>
      )}
    </>
  );
};
