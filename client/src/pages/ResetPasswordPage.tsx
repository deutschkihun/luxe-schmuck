import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../actions/user_actions";
import { rex } from "../helper/utils";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { Form, Input, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { IFormInputs } from "../helper/interface";
import { RootState } from "../store";
import { LoadingView } from "../components/LoadingView";
import { USER_RESET_PASSWORD_RESET } from "../actions/types";

export const ResetPasswordPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const userFindPassword = useSelector(
    (state: RootState) => state.userFindPassword
  );

  const userResetPassword = useSelector(
    (state: RootState) => state.userResetPassword
  );

  const { loading, error, success } = userResetPassword;
  const { email } = userFindPassword;
  console.log("email", email);
  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    data.email = email as string;
    setBody(data);
  };

  console.log(body);

  useEffect(() => {
    body && dispatch(resetPasswordUser(body));
    dispatch({ type: USER_RESET_PASSWORD_RESET });
    return () => {
      setBody(undefined);
    };
  }, [body]);

  useEffect(() => {
    success && history.push("/login");
  }, [success]);

  return (
    <>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleComponent title={"Reset Password"} />
          <LabelComponent label={"Password"} />
          <InputComponent
            type={"password"}
            placeholder={"enter your new password"}
            register={register}
            registerValue={"password"}
            pattern={rex}
            message={
              "At least 1 uppercase, special character and longer than 8 chars"
            }
          />
          <ErrorMessageComponent name={"password"} errors={errors} />
          <LabelComponent label={"Confirm Password"} />
          <Input
            type="password"
            placeholder="check your password again"
            {...register("password_confirm", {
              required: "This input is required.",
              validate: (value: string) => value === password.current,
            })}
          />
          <ErrorMessageComponent name={"password_confirm"} errors={errors} />

          <SubmitInput value="Reset Password" />
          <SubmitButton onClick={() => history.push("/")}>
            Back to Sign in
          </SubmitButton>
          {error && <Warning>{error}</Warning>}
        </Form>
      )}
    </>
  );
};
