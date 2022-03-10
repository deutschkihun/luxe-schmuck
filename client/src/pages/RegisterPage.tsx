import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { IFormInputs } from "../helper/interface";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/user_actions";
import { Form, Input, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { emailRex, rex, stringRex } from "../helper/utils";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { RootState } from "../store";
import { LoadingView } from "../components/LoadingView";

export const RegisterPage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const userRegister = useSelector((state: RootState) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  useEffect(() => {
    body && dispatch(registerUser(body));

    return () => {
      setBody(undefined);
    };
  }, [body]);

  useEffect(() => {
    if (userInfo) {
      history.push("/success");
    }
  }, [history, userInfo]);

  return (
    <>
      {loading ? (
        <LoadingView
          title={"Loading ..."}
          body={"We are processing the requested work."}
        />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleComponent title={"Registration"} />
          <LabelComponent label={"First Name"} />
          <InputComponent
            placeholder={"enter your first name"}
            register={register}
            registerValue={"firstName"}
            pattern={stringRex}
            message={"This input is string only."}
          />
          <ErrorMessageComponent name={"firstName"} errors={errors} />

          <LabelComponent label={"Last Name"} />
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
            message={"Invalid email format"}
          />
          <ErrorMessageComponent name={"email"} errors={errors} />

          <LabelComponent label={"Password"} />
          <InputComponent
            type={"password"}
            placeholder={"enter your password"}
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

          {error && <Warning>{error}</Warning>}
          <SubmitInput value="register" />
          <SubmitButton onClick={() => history.push("/login")}>
            back
          </SubmitButton>
        </Form>
      )}
    </>
  );
};
