import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../components/Pagination";
import { listProducts, deleteProduct } from "../actions/productActions";
import { MatchParams } from "../helper/interface";
import { RootState } from "../store";
import { LoadingView } from "../components/LoadingView";
import {
  HighlightLink,
  ListTitle,
  ProductListContainer,
  Warning,
} from "../helper/lib";

export const ProductListPage = (props: MatchParams): JSX.Element => {
  const history = useHistory();
  const pageNumber = props.match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state: RootState) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push("/login");
    }

    dispatch(listProducts("", "", pageNumber));
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <ProductListContainer>
      <ListTitle>Product Lists</ListTitle>
      <HighlightLink to="/admin/product/create">
        <i className="fas fa-plus"></i> CREATE PRODUCT
      </HighlightLink>

      <div className="admin__list">
        {errorDelete && <Warning className="error">{errorDelete}</Warning>}

        {loading ? (
          <LoadingView title={"Loading ..."} body={"please wait a moment"} />
        ) : error ? (
          <Warning>{error}</Warning>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">BRAND</th>
                <th scope="col">EDIT</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.productname}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="btn">
                          <i className="fas fa-edit"></i>
                        </button>
                      </Link>
                    </td>

                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteHandler(product._id as string)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <Pagination pages={pages as number} page={page as number} />
      </div>
    </ProductListContainer>
  );
};
