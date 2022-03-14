/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../actions/types";
import { LoadingView } from "../components/LoadingView";
import { Form, SubmitInput, Warning } from "../helper/lib";
import { useHistory } from "react-router";
import { RootState } from "../store";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TextAreaComponent,
} from "../helper/helperComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInputs } from "../helper/interface";
import { mixRex, urlRex } from "../helper/utils";

const ProductCreateScreen = (): JSX.Element => {
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
      //dispatch({ type: PRODUCT_CREATE_RESET });
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
      const { data } = await axios.post("/api/v1/upload", formData, config);
      //setBody({ image: data });
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const [body, setBody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  useEffect(() => {
    body && dispatch(createProduct(body));
    return () => {
      setBody(undefined);
    };
  }, [body]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LabelComponent label={"Product name"} />
      <InputComponent
        placeholder={"enter product name"}
        register={register}
        registerValue={"productname"}
        pattern={mixRex}
        message={"Only number and string allowed"}
      />
      <ErrorMessageComponent name={"productname"} errors={errors} />

      <LabelComponent label={"Brand"} />
      <InputComponent
        placeholder={"enter brand"}
        register={register}
        registerValue={"brand"}
        pattern={mixRex}
        message={"Only number and string allowed"}
      />
      <ErrorMessageComponent name={"brand"} errors={errors} />

      <LabelComponent label={"Category"} />
      <InputComponent
        placeholder={"enter category"}
        register={register}
        registerValue={"category"}
        pattern={mixRex}
        message={"Only number and string allowed"}
      />
      <ErrorMessageComponent name={"category"} errors={errors} />

      <LabelComponent label={"Image"} />
      <InputComponent
        placeholder={"Enter image url"}
        register={register}
        registerValue={"image"}
        pattern={urlRex}
        message={"Only url form allowed"}
      />
      <ErrorMessageComponent name={"image"} errors={errors} />

      <LabelComponent label={"Image"} />
      <input
        type="file"
        placeholder={"Enter image url"}
        onChange={() => uploadFileHandler}
      />
      {uploading && (
        <LoadingView title={"Uploading ..."} body={"please wait a moment"} />
      )}
      <ErrorMessageComponent name={"price"} errors={errors} />

      <LabelComponent label={"Stock"} />
      <InputComponent
        type="number"
        placeholder={"enter stock"}
        register={register}
        registerValue={"countInStock"}
        pattern={mixRex}
        message={"Only number allowed"}
      />
      <ErrorMessageComponent name={"countInStock"} errors={errors} />

      <LabelComponent label={"Decription"} />
      <TextAreaComponent
        placeholder={"enter description"}
        register={register}
        registerValue={"description"}
        pattern={mixRex}
      />
      <ErrorMessageComponent name={"description"} errors={errors} />
      <SubmitInput className="create-product" value="register" />
    </Form>
  );
};

export default ProductCreateScreen;
