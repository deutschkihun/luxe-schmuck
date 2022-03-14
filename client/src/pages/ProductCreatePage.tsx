/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../actions/types";
import { LoadingView } from "../components/LoadingView";
import { Form, Warning } from "../helper/lib";
import { useHistory } from "react-router";
import { RootState } from "../store";

const ProductCreateScreen = (): JSX.Element => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const productCreate = useSelector((state: RootState) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push("/admin/productlist");
    }
  }, [dispatch, history, successCreate]);

  const uploadFileHandler = async (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <Form>
      <h3 className="user__list__title">CREATE PRODUCT</h3>
      {loadingCreate && (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      )}
      {errorCreate && <Warning>{errorCreate}</Warning>}

      <form onSubmit={submitHandler}>
        <div className="form__content">
          <div>Name</div>
          <input
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form__content">
          <div>Price</div>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>

        <div className="form__content">
          <div>Image</div>
          <input
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="form__content__upload">
            <input type="file" onChange={() => uploadFileHandler} />
            {uploading && (
              <LoadingView
                title={"Loading ..."}
                body={"please wait a moment"}
              />
            )}
          </div>
        </div>

        <div className="form__content">
          <div>Brand</div>
          <input
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="form__content">
          <div>Count In Stock</div>
          <input
            type="number"
            placeholder="Enter countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(parseInt(e.target.value))}
          />
        </div>

        <div className="form__content">
          <div>Category</div>
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form__content">
          <div>Description</div>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn">CREATE</button>
      </form>
    </Form>
  );
};

export default ProductCreateScreen;
