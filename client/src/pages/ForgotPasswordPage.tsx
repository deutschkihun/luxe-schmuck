import React, { useState } from "react";
import { useHistory } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInputs } from "../helper/interface";
import { useDispatch } from "react-redux";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { Form, SubmitButton, SubmitInput } from "../helper/lib";
import { emailRex, stringRex } from "../helper/utils";

export const ForgotPasswordPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const [body, setbody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setbody(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TitleComponent title={"Forgot Password"} />
      <LabelComponent label={"First name"}></LabelComponent>
      <InputComponent
        placeholder="enter your first name"
        register={register}
        registerValue={"firstName"}
        pattern={stringRex}
        message={"This input is number only."}
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

      <LabelComponent label={"Email"} />
      <InputComponent
        placeholder={"enter your email"}
        register={register}
        registerValue={"email"}
        pattern={emailRex}
        message={"Invalid email format."}
      />
      <ErrorMessageComponent name={"email"} errors={errors} />

      <SubmitInput value="Find Password" />
      <SubmitButton type="submit" onClick={() => history.push("/login")}>
        Back to Sign in
      </SubmitButton>
    </Form>
  );
};
