import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../components/Pagination";
import { listProducts } from "../actions/productActions";
import { NavLink } from "react-router-dom";
import { HighlightLink, ProductComponent, Warning } from "../helper/lib";
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
  console.log(products);

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber));
  }, [dispatch, keyword, category, pageNumber]);

  return (
    <>
      <div className="container">
        <div>
          <ul className="productLanding__filter">
            <li className="productLanding__filter__item">
              <NavLink exact to="/product" activeClassName="active">
                ALL
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/product/category/coats" activeClassName="active">
                COATS & JACKETS
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/product/category/tops" activeClassName="active">
                TOPS
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/product/category/dresses" activeClassName="active">
                DRESSES
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/product/category/bottoms" activeClassName="active">
                BOTTOMS
              </NavLink>
            </li>
          </ul>
        </div>
        {loading ? (
          <LoadingView title={"Loading ..."} body={"please wait a moment"} />
        ) : error ? (
          <Warning>{error}</Warning>
        ) : (
          <>
            <ProductComponent>
              {products?.map((product) => (
                <HighlightLink key={product._id} to={`/product/${product._id}`}>
                  <img src={product.image} alt="product_image" />
                  <div>{product.productname}</div>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  ${product.price}
                </HighlightLink>
              ))}
            </ProductComponent>
          </>
        )}
        <Pagination
          pages={pages as number}
          page={page as number}
          keyword={keyword ? keyword : ""}
          category={category ? category : ""}
        />
      </div>
    </>
  );
};
