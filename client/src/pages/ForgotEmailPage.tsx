import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { findEmailUser } from "../actions/user_actions";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { IFormInputs } from "../helper/interface";
import { Form, SubmitButton, SubmitInput } from "../helper/lib";
import { stringRex } from "../helper/utils";

export const ForgotEmailPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [body, setBody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  useEffect(() => {
    body && dispatch(findEmailUser(body));

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TitleComponent title={"Forgot Email"} />
      <LabelComponent label={"First name"} />
      <InputComponent
        placeholder={"enter your first name"}
        register={register}
        registerValue={"firstName"}
        pattern={stringRex}
        message={"This input is string only."}
      />
      <ErrorMessageComponent name={"firstName"} errors={errors} />
      <LabelComponent label={"Last name"} />
      <InputComponent
        placeholder={"enter your last name"}
        register={register}
        registerValue={"lastName"}
        pattern={stringRex}
        message={"This input is string only."}
      />
      <ErrorMessageComponent name={"lastName"} errors={errors} />

      <SubmitInput value="Find Email" />
      <SubmitButton type="submit" onClick={() => history.push("/login")}>
        Back to Sign in
      </SubmitButton>
      {/*
      {foundEmail.length > 0 && <Warning>{foundEmail}</Warning>}
      {error.length > 0 && (
        <Warning style={{ textAlign: "center" }}>{error}</Warning>
      )}*/}
    </Form>
  );
};
