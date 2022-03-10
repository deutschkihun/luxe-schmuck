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
import { getUserDetails } from "../actions/user_actions";
import { LoadingView } from "../components/LoadingView";

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
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { loading, error, user } = userDetails;

  console.log("user", user?.firstName);
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state: RootState) => state.userUpdateProfile
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || success) {
        console.log("ff");
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        //dispatch(listMyOrders());
      } else {
        console.log("ff2");
        setFirstname(user?.firstName as string);
        setLastname(user?.lastName as string);
        setEmail(user?.email as string);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  return (
    <>
      {loading ? (
        <LoadingView
          title={"Loading your data"}
          body={"please wait a moment"}
        />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error ? (
            <>
              <TitleComponent title="Error" />
              <Warning>{error}</Warning>
            </>
          ) : (
            <>
              <TitleComponent title={"Setting"} />
              <LabelComponent label={"First Name"} />
              <InputComponent
                placeholder={"enter your first name"}
                type="text"
                defaultValue={firstname}
                register={register}
                registerValue={"firstName"}
                pattern={stringRex}
                message={"This input is string only."}
              />
              <ErrorMessageComponent name={"firstName"} errors={errors} />

              <LabelComponent label={"Last Name"} />
              <InputComponent
                placeholder={"enter your last name"}
                type="text"
                defaultValue={lastname}
                register={register}
                registerValue={"lastName"}
                pattern={stringRex}
                message={"This input is string only."}
              />
              <ErrorMessageComponent name={"lastName"} errors={errors} />

              <LabelComponent label={"Email"} />
              <InputComponent
                defaultValue={email}
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

              <SubmitInput value="change" />
              <SubmitButton onClick={() => history.push("/")}>
                back
              </SubmitButton>
            </>
          )}
        </Form>
      )}
    </>
  );
};
