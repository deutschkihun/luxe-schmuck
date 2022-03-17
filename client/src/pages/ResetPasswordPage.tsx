import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../actions/userActions";
import { rex } from "../helper/utils";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { Form, Input, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { RootState } from "../store";
import { LoadingView } from "../components/LoadingView";
import { USER_RESET_PASSWORD_RESET } from "../actions/types";

interface Props {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  password_confirm: string;
}

export const ResetPasswordPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Props>({
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
  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<Props>();
  const onSubmit: SubmitHandler<Props> = (data: Props) => {
    data.email = email as string;
    setBody(data);
  };

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
