import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { IFormInputs } from "../helper/interface";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, SubmitButton, SubmitInput, Warning } from "../helper/lib";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { emailRex, rex, stringRex } from "../helper/utils";
import { RootState } from "../store";
import { USER_UPDATE_PROFILE_RESET } from "../actions/types";
import { getUserDetails, updateUserProfile } from "../actions/user_actions";
import { LoadingView } from "../components/LoadingView";
import { failToLoad } from "../helper/message";

export const ProfilePage = (): JSX.Element => {
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
  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);
  console.log("body", body);

  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector(
    (state: RootState) => state.userUpdateProfile
  );
  const { loading: updateLoading, success } = userUpdateProfile;

  useEffect(() => {
    if (success) {
      history.push("/");
    } else {
      if (!user) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        //dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, user, success]);

  useEffect(() => {
    body && dispatch(updateUserProfile(body));
    return () => {
      setBody(undefined);
    };
  }, [body]);

  return (
    <>
      {loading || updateLoading ? (
        <LoadingView title={"Loading ..."} body={"please wait a moment"} />
      ) : user ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error ? (
            <>
              <TitleComponent title="Error" />
              <Warning>{error}</Warning>
            </>
          ) : (
            <>
              <TitleComponent title={"MY LUXE SCHMUCK"} />
              <LabelComponent label={"First Name"} />
              <InputComponent
                placeholder={"enter your first name"}
                type="text"
                defaultValue={user.firstname as string}
                register={register}
                registerValue={"firstname"}
                pattern={stringRex}
                message={"This input is string only."}
              />
              <ErrorMessageComponent name={"firstname"} errors={errors} />

              <LabelComponent label={"Last Name"} />
              <InputComponent
                placeholder={"enter your last name"}
                type="text"
                defaultValue={user.lastname as string}
                register={register}
                registerValue={"lastname"}
                pattern={stringRex}
                message={"This input is string only."}
              />
              <ErrorMessageComponent name={"lastName"} errors={errors} />

              <LabelComponent label={"Email"} />
              <InputComponent
                defaultValue={user.email as string}
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
              <ErrorMessageComponent
                name={"password_confirm"}
                errors={errors}
              />

              <SubmitInput value="update" />
              <SubmitButton onClick={() => history.push("/")}>
                back
              </SubmitButton>
            </>
          )}
        </Form>
      ) : (
        <>
          <TitleComponent title="Error" />
          <Warning>{failToLoad}</Warning>
        </>
      )}
    </>
  );
};
