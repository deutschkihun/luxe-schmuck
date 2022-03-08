import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { loginFormInputs } from "../helper/interface";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form,
  HighlightLink,
  Input,
  Label,
  SubmitButton,
  SubmitInput,
  SubTitle,
  Title,
  Warning,
} from "../helper/lib";
import { rex } from "../helper/utils";

export const LoginPage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginFormInputs>({
    criteriaMode: "all",
  });

  const [body, setBody] = useState<loginFormInputs>();
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<loginFormInputs> = (data: loginFormInputs) =>
    setBody(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Login</Title>
      <Label>Email</Label>
      <Input
        placeholder="enter your email"
        {...register("email", {
          required: "This input is required.",
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email format",
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <Warning key={type}>{message}</Warning>
              ))
            : null;
        }}
      />

      <Label>Password</Label>
      <Input
        type="password"
        placeholder="enter your password"
        {...register("password", {
          required: "This input is required.",
          pattern: {
            value: rex,
            message:
              "Password should contain at least 1 uppercase, sepcial character and be eight chracters or longer",
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <Warning key={type}>{message}</Warning>
              ))
            : null;
        }}
      />
      <SubTitle>
        No account yet ? then{" "}
        <HighlightLink to="/register">sign up</HighlightLink> now.
      </SubTitle>
      <SubTitle>
        Forgot your Email or PW ? then click{" "}
        <HighlightLink to="/forgot">here.</HighlightLink>
      </SubTitle>
      <SubmitInput value="login" />
      <SubmitButton onClick={() => history.push("/")}>
        BACK TO LUXE SCHMUCK
      </SubmitButton>
    </Form>
  );
};
