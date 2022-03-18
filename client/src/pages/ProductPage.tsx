import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../components/Pagination";
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
import { MatchParams } from "../helper/interface";
import { Rating } from "../components/Rating";

export const ProductPage = (props: MatchParams): JSX.Element => {
  const category = props.match.params.category;
  const keyword = props.match.params.keyword;
  const pageNumber = props.match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber));
  }, [dispatch, keyword, category, pageNumber]);

  return (
    <ProductContainer>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : products ? (
        <ProductContainer>
          <ProductComponent>
            {products?.map((product) => (
              <HighlightLink key={product._id} to={`/product/${product._id}`}>
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
        </ProductContainer>
      ) : (
        <Warning>{error as string}</Warning>
      )}
      <Pagination
        pages={pages as number}
        page={page as number}
        keyword={keyword ? keyword : ""}
        category={category ? category : ""}
      />
    </ProductContainer>
  );
};
