import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../actions/types";
import { IFormInputs, MatchParams } from "../helper/interface";
import { useHistory } from "react-router";
import { mixRex, multipartConfig, numRex } from "../helper/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingView } from "../components/LoadingView";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TextAreaComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { Form, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { RootState } from "../store";

export const ProductEditPage = (props: MatchParams): JSX.Element => {
  const productId = props.match.params.id;
  const history = useHistory();
  const [image, setImage] = useState<string>("");
  const [imageMsg, setImageMsg] = useState<string>("");
  const dispatch = useDispatch();
  const productDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state: RootState) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else if (product?._id !== productId) {
      dispatch(listProductDetails(productId));
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    const formData = new FormData();
    formData.append("image", file[0]);
    const { data } = await axios.post(
      "/api/v1/upload",
      formData,
      multipartConfig
    );
    setImage(data);
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
    if (body) {
      body._id = productId;
      if (image) {
        body.image = image;
        dispatch(updateProduct(body));
      } else {
        setImageMsg("Image is required");
      }
    }
    return () => {
      setBody(undefined);
    };
  }, [body]);

  return (
    <>
      {loading || loadingUpdate ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : product ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error || errorUpdate ? (
            <>
              <TitleComponent title="Error" />
              <Warning>{error}</Warning>
            </>
          ) : (
            <>
              <LabelComponent label={"Product name"} />
              <InputComponent
                defaultValue={product.productname}
                placeholder={"enter product name"}
                register={register}
                registerValue={"productname"}
                pattern={mixRex}
                message={"Only number and string allowed"}
              />
              <ErrorMessageComponent name={"productname"} errors={errors} />
              <LabelComponent label={"Brand"} />
              <InputComponent
                defaultValue={product.brand}
                placeholder={"enter brand"}
                register={register}
                registerValue={"brand"}
                pattern={mixRex}
                message={"Only number and string allowed"}
              />
              <ErrorMessageComponent name={"brand"} errors={errors} />
              <LabelComponent label={"Category"} />
              <InputComponent
                defaultValue={product.category}
                placeholder={"enter category"}
                register={register}
                registerValue={"category"}
                pattern={mixRex}
                message={"Only number and string allowed"}
              />
              <ErrorMessageComponent name={"category"} errors={errors} />
              <LabelComponent label={"Product image"} />
              <input type="file" onChange={uploadFileHandler} />
              {imageMsg && <Warning>{imageMsg}</Warning>}
              <LabelComponent label={"Price in $"} />
              <InputComponent
                type="number"
                defaultValue={product.price}
                placeholder={"enter price"}
                register={register}
                registerValue={"price"}
                pattern={numRex}
                message={"Only number allowed"}
              />
              <ErrorMessageComponent name={"price"} errors={errors} />
              <LabelComponent label={"Stock"} />
              <InputComponent
                type="number"
                defaultValue={product.countInStock}
                placeholder={"enter stock"}
                register={register}
                registerValue={"countInStock"}
                pattern={numRex}
                message={"Only number allowed"}
              />
              <ErrorMessageComponent name={"countInStock"} errors={errors} />
              <LabelComponent label={"Decription"} />
              <TextAreaComponent
                defaultValue={product.description}
                placeholder={"enter description"}
                register={register}
                registerValue={"description"}
                pattern={mixRex}
                message={"Only number and string allowed"}
              />
              <ErrorMessageComponent name={"description"} errors={errors} />
              <SubmitInput value="edit" />
              <SubmitButton
                type="submit"
                onClick={() => history.push("/admin/productlist")}
              >
                Back to product list
              </SubmitButton>
            </>
          )}
        </Form>
      ) : (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      )}
    </>
  );
};
