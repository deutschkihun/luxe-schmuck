import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInputs } from "../helper/interface";
import { useDispatch, useSelector } from "react-redux";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { Form, Input, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import { emailRex, stringRex } from "../helper/utils";
import { RootState } from "../store";
import { findPasswordUser } from "../actions/user_actions";
import { LoadingView } from "../components/LoadingView";
import { USER_FIND_PASSWORD_RESET } from "../actions/types";

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

  const [body, setBody] = useState<IFormInputs>();
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [VerificationMsg, setVerificationMsg] = useState<string>("");
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);
  const userFindPassword = useSelector(
    (state: RootState) => state.userFindPassword
  );

  const { loading, error, pin } = userFindPassword;
  const handleChange = (e: { target: { value: string } }) => {
    setEnteredPin(e.target.value);
  };

  const onCheckPinHandler = () => {
    if (pin == enteredPin) {
      history.push("/reset/password");
    } else {
      setVerificationMsg("wrong verification code");
    }
  };

  useEffect(() => {
    dispatch({ type: USER_FIND_PASSWORD_RESET });
  }, []);

  useEffect(() => {
    body && dispatch(findPasswordUser(body));
    return () => {
      setBody(undefined);
    };
  }, [body]);

  return (
    <>
      {loading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleComponent title={"Forgot Password"} />
          <LabelComponent label={"First name"}></LabelComponent>
          <InputComponent
            placeholder="enter your first name"
            register={register}
            registerValue={"firstname"}
            pattern={stringRex}
            message={"This input is number only."}
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
          {error && <Warning>{error}</Warning>}
          {pin && (
            <>
              <TitleComponent title={"Verification"} />
              <Warning>
                Verification code is sent. Please check your mailbox
              </Warning>
              <Input
                type="text"
                placeholder="enter verification code"
                value={enteredPin}
                onChange={handleChange}
              />
              {VerificationMsg && <Warning>{VerificationMsg}</Warning>}
              <SubmitButton onClick={onCheckPinHandler}>Send</SubmitButton>
            </>
          )}
        </Form>
      )}
    </>
  );
};
