import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInputs } from "../helper/interface";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  HighlightLink,
  Label,
  SubmitButton,
  SubmitInput,
  SubTitle,
} from "../helper/lib";
import { emailRex, rex } from "../helper/utils";
import { loginUser } from "../actions/user_actions";
import { RootState } from "../store";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { LoadingView } from "../components/LoadingView";

export const LoginPage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const [body, setBody] = useState<IFormInputs>();
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  console.log("error", error);

  useEffect(() => {
    body && dispatch(loginUser(body));

    return () => {
      setBody(undefined);
    };
  }, [body]);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
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
          <TitleComponent title={"Login"} />
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
          {error && <Label>{error}</Label>}

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
      )}
    </>
  );
};
