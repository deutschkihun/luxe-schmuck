import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/Product";
import { Pagination } from "../components/Pagination";
import { listProducts } from "../actions/productActions";
import { NavLink } from "react-router-dom";
import { Warning } from "../helper/lib";
import { LoadingView } from "../components/LoadingView";
import { RootState } from "../store";
import { MatchParams } from "../helper/interface";

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
    <>
      <div className="container">
        <div>
          <ul className="productLanding__filter">
            <li className="productLanding__filter__item">
              <NavLink exact to="/shop" activeClassName="active">
                ALL
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/shop/category/coats" activeClassName="active">
                COATS & JACKETS
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/shop/category/tops" activeClassName="active">
                TOPS
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/shop/category/dresses" activeClassName="active">
                DRESSES
              </NavLink>
            </li>
            <li className="productLanding__filter__item">
              <NavLink to="/shop/category/bottoms" activeClassName="active">
                BOTTOMS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="productLanding__title">
          LATEST PRODUCTS
          <br />
          20% OFF ALL TOPS & DRESS
        </div>
        {loading ? (
          <LoadingView title={"Loading ..."} body={"please wait a moment"} />
        ) : error ? (
          <Warning>{error}</Warning>
        ) : (
          <div className="products">
            {/*products?.map((product) => (
              <Product key={product._id} product={product} />
            ))*/}
          </div>
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
