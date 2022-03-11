import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { USER_FIND_EMAIL_RESET } from "../actions/types";
import { findEmailUser } from "../actions/user_actions";
import { LoadingView } from "../components/LoadingView";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { IFormInputs } from "../helper/interface";
import { Form, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { stringRex } from "../helper/utils";
import { RootState } from "../store";

export const ForgotEmailPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [body, setBody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  const userFindEmail = useSelector((state: RootState) => state.userFindEmail);
  const { loading, email, error } = userFindEmail;

  useEffect(() => {
    body && dispatch(findEmailUser(body));
    dispatch({ type: USER_FIND_EMAIL_RESET });

    return () => {
      setBody(undefined);
    };
  }, [body]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  return (
    <>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleComponent title={"Forgot Email"} />
          <LabelComponent label={"First name"} />
          <InputComponent
            placeholder={"enter your first name"}
            register={register}
            registerValue={"firstname"}
            pattern={stringRex}
            message={"This input is string only."}
          />
          <ErrorMessageComponent name={"firstname"} errors={errors} />
          <LabelComponent label={"Last name"} />
          <InputComponent
            placeholder={"enter your last name"}
            register={register}
            registerValue={"lastname"}
            pattern={stringRex}
            message={"This input is string only."}
          />
          <ErrorMessageComponent name={"lastname"} errors={errors} />

          <SubmitInput value="Find Email" />
          <SubmitButton type="submit" onClick={() => history.push("/login")}>
            Back to Sign in
          </SubmitButton>
          {email && <Warning>{`Your email is ${email}`}</Warning>}
          {error && <Warning>{error}</Warning>}
        </Form>
      )}
    </>
  );
};
