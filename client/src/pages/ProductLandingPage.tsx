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
import { MatchParams } from "../helper/interface";
import { Rating } from "../components/Rating";
import { Row, Col } from "antd";
import { CheckBox } from "../components/CheckBox";
import { categories, brand } from "../helper/utils";
import { RadioBox } from "../components/RadioBox";
import { SearchEngine } from "../components/SearchEngine";

export const ProductLandingPage = (props: MatchParams): JSX.Element => {
  const category = props.match.params.category;
  const keyword = props.match.params.keyword;
  const pageNumber = props.match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const [Filters, setFilters] = useState({
    categories: [],
    brand: [],
  });
  const [SearchTerm, setSearchTerm] = useState<string>("");

  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber));
  }, [dispatch, keyword, category, pageNumber]);

  const handleFilters = (
    filters: { categories: number[]; brand: number[] },
    field: string
  ) => {
    const newFilters = { ...Filters };
    //newFilters[field] = filters;
    setFilters(newFilters);
    /*getProducts({
      filters: newFilters,
    }).then(() => setFilters(newFilters));*/
  };

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
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <CheckBox
                list={categories}
                handleFilters={(filters) =>
                  handleFilters(filters, "categories")
                }
              />
            </Col>
            <Col lg={12} xs={24}>
              <RadioBox
                list={brand}
                handleFilters={(filters) => handleFilters(filters, "brand")}
              />
            </Col>
            <Col lg={12} xs={24}></Col>
          </Row>

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
