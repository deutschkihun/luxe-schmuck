import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import {
  HighlightLink,
  Img,
  ProductComponent,
  ProductContainer,
  SearchContainer,
  Warning,
} from "../helper/lib";
import { LoadingView } from "../components/LoadingView";
import { RootState } from "../store";
import { Rating } from "../components/Rating";
import { Row } from "antd";
import { SearchEngine } from "../components/SearchEngine";

export const ProductLandingPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [Filters, setFilters] = useState({
    categories: [],
    brand: [],
  });
  const [SearchTerm, setSearchTerm] = useState<string>("");

  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  /*const getProducts = async (body) => {
    await axios.post("/api/v1/products/filter", body).then((response) => {
      if (response.data.success) {
        setItems([...response.data.data]);
      } else {
        alert("Fail to load data");
      }
    });
  };*/

  const updateSearchTerm = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    /*getProducts({
      filters: Filters,
      searchTerm: newSearchTerm,
    });*/
  };

  return (
    <ProductContainer>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : products ? (
        <>
          <SearchContainer>
            <SearchEngine refreshFunction={updateSearchTerm} />
          </SearchContainer>

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
