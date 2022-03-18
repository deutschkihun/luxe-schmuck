import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../actions/types";
import { LoadingView } from "../components/LoadingView";
import { Form, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { useHistory } from "react-router";
import { RootState } from "../store";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TextAreaComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInputs } from "../helper/interface";
import { mixRex, multipartConfig, numRex } from "../helper/utils";
import axios from "axios";

export const ProductCreatePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState<string>("");
  const [imageMsg, setImageMsg] = useState<string>("");
  const productCreate = useSelector((state: RootState) => state.productCreate);
  const { loading, error, success: successCreate } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
  }, []);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push("/admin/productlist");
    }
  }, [dispatch, history, successCreate]);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    const formData = new FormData();
    console.log(file[0] as File);
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
      if (image) {
        body.image = image;
        dispatch(createProduct(body));
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
      {loading ? (
        <LoadingView
          title={"Loading ..."}
          body={"We are processing the requested work."}
        />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error ? (
            <>
              <TitleComponent title="Error" />
              <Warning>{error}</Warning>
              <SubmitButton
                type="submit"
                onClick={() => history.push("/admin/product/create")}
              >
                Back to product create
              </SubmitButton>
            </>
          ) : (
            <>
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
              <LabelComponent label={"Product image"} />
              {/*<ImagesFileUpload />*/}
              <input type="file" onChange={uploadFileHandler} />
              {imageMsg && <Warning>{imageMsg}</Warning>}
              <LabelComponent label={"Price in $"} />
              <InputComponent
                type="number"
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
                placeholder={"enter stock"}
                register={register}
                registerValue={"countInStock"}
                pattern={numRex}
                message={"Only number allowed"}
              />
              <ErrorMessageComponent name={"countInStock"} errors={errors} />
              <LabelComponent label={"Decription"} />
              <TextAreaComponent
                placeholder={"enter description"}
                register={register}
                registerValue={"description"}
                pattern={mixRex}
                message={"Only number and string allowed"}
              />
              <ErrorMessageComponent name={"description"} errors={errors} />
              <SubmitInput value="create" />
              <SubmitButton
                type="submit"
                onClick={() => history.push("/admin/productlist")}
              >
                Back to product list
              </SubmitButton>
            </>
          )}
        </Form>
      )}
    </>
  );
};
